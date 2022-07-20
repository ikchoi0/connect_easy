const emailConfirmation = (
  clientEmail,
  description,
  appointment,
  DASHBOARD_PAGE
) => {
  return `<table border="0" cellpadding="0" cellspacing="0" width="100%">

 <!-- start logo -->
 <tbody><tr>
   <td align="center" bgcolor="#e9ecef">
     <!--[if (gte mso 9)|(IE)]>
     <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
     <tr>
     <td align="center" valign="top" width="600">
     <![endif]-->
     
     <!--[if (gte mso 9)|(IE)]>
     </td>
     </tr>
     </table>
     <![endif]-->
   </td>
 </tr>
 <!-- end logo -->
 
 <!-- start hero -->
 <tr>
   <td align="center" bgcolor="#e9ecef">
     <!--[if (gte mso 9)|(IE)]>
     <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
     <tr>
     <td align="center" valign="top" width="600">
     <![endif]-->
     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
       <tbody><tr>
         <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
           <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Your appointment was booked!</h1>
         </td>
       </tr>
     </tbody></table>
     <!--[if (gte mso 9)|(IE)]>
     </td>
     </tr>
     </table>
     <![endif]-->
   </td>
 </tr>
 <!-- end hero -->
 
 <!-- start copy block -->
 <tr>
   <td align="center" bgcolor="#e9ecef">
     <!--[if (gte mso 9)|(IE)]>
     <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
     <tr>
     <td align="center" valign="top" width="600">
     <![endif]-->
     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
 
       <!-- start copy -->
       <tbody><tr>
         <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
           <p style="margin: 0;">
           Hi&nbsp;${appointment.consultant.firstName},<br>
           ${clientEmail}&nbsp;has booked a meeting with you.<br>
           Inquiry: ${description} <br> 
           On: ${appointment.date}<br>
           
           </p>
         </td>
       </tr>
       <!-- end copy -->
 
       <!-- start button -->
       <tr>
         <td align="left" bgcolor="#ffffff">
           <table border="0" cellpadding="0" cellspacing="0" width="100%">
             <tbody><tr>
               <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                 <table border="0" cellpadding="0" cellspacing="0">
                   <tbody><tr>
                     <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                       <a href="${DASHBOARD_PAGE}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Redirect to your dashboard</a>
                     </td>
                   </tr>
                 </tbody></table>
               </td>
             </tr>
           </tbody></table>
         </td>
       </tr>
       <!-- end button -->
 
       <!-- start copy -->
       <tr>
         <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
           <p style="margin: 0;">Cheers,<br> Connect easy</p>
         </td>
       </tr>
       <!-- end copy -->
 
     </tbody></table>
     <!--[if (gte mso 9)|(IE)]>
     </td>
     </tr>
     </table>
     <![endif]-->
   </td>
 </tr>
 <!-- end copy block -->
 
 <!-- start footer -->
 
 <!-- end footer -->
 
 </tbody></table>`;
};

module.exports = emailConfirmation;
