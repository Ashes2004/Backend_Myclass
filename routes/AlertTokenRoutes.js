import AlertToken from "../models/AlertTokenModel.js";
import express from 'express';
import admin from  'firebase-admin'
const router = express.Router();


router.post('/save-token', async (req, res) => {
    
  
    try {
      const existingAlertToken = await AlertToken.findOne({ token : req?.body?.token || null });
      if (existingAlertToken) {
        return res.status(200).json({ message: 'AlertToken already saved' , tokenId: existingAlertToken._id  });
      }
      const newAlertToken = new AlertToken(req.body);
        await newAlertToken.save();
       return  res.status(200).json({ message: 'AlertToken saved successfully'  ,tokenId: newAlertToken._id });
     
    } catch (error) {
     return res.status(500).json({ error: 'Failed to save AlertToken' });
    }
  });
  

 
// Send Notification Route
router.post('/send-notification/:id', async (req, res) => {
    const { title, body  } = req.body;
  
    try {
      const AlertTokens = await AlertToken.find();
      const AlertTokenArray = AlertTokens.map((AlertTokenDoc) => AlertTokenDoc.token);
  
      if (AlertTokenArray.length === 0) {
        return res.status(400).json({ error: 'No registered AlertTokens' });
      }
      const selfToken = await AlertToken.findById(req.params.id);
      if(selfToken.length == 0)
      {
        return res.status(400).json({ error: 'No registered AlertTokens' });
      }
      const updatedAlertTokenArray = AlertTokenArray.filter(token => token !== selfToken.token );
  
      const message = {
        notification: {
          title: title || 'New Notification',
          body: body || 'You have a new message!',
          
        },
        tokens: updatedAlertTokenArray,  
      };
  
      const response = await admin.messaging().sendMulticast(message);
   
    // const message = {
    //     notification: {
    //       title: title || 'Test Notification',
    //       body: body || 'This is a test message',
    //     },
    //     token: AlertTokenArray[0],  // Send to a single token for testing
    //   };
      
    //   const response = await admin.messaging().send(message);
      
  
      // Log response for debugging
      console.log('FCM response:', response);
  
    //   const failedTokens = [];
    //   response.responses.forEach((resp, idx) => {
    //     if (!resp.success) {
    //       console.log(`Token failed: ${AlertTokenArray[idx]} - Error: ${resp.error}`);
    //       if (resp.error.code === 'messaging/registration-token-not-registered') {
    //         failedTokens.push(AlertTokenArray[idx]);
    //       }
    //     }
    //   });
  
    //   if (failedTokens.length > 0) {
    //     await AlertToken.deleteMany({ token: { $in: failedTokens } });
    //     console.log('Removed invalid tokens:', failedTokens);
    //   }
  
     return  res.status(200).json({ message: 'Notifications sent successfully', response });
    } catch (error) {
      console.error('Error sending notifications:', error);
     return res.status(500).json({ error: 'Error sending notifications', details: error.message });
    }
  });
  
 
  
 
  
  
export default router;
