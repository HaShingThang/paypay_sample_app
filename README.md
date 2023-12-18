# PayPay OPA SDK  - Node(Express.js)

## Install npm package
https://www.npmjs.com/package/@paypayopa/paypayopa-sdk-node
```
import PAYPAY from "@paypayopa/paypayopa-sdk-node";
OR
const PAYPAY = require('@paypayopa/paypayopa-sdk-node');
```

## APP Payment
https://developer.paypay.ne.jp/products/docs/qrcode
  ### 1. Dynamic QR Code (Create QR Code)
  - Dyanmic QR Code သည် အရောင်းဆိုင် တစ်ခုခု အတွက်သာဖြစ်ပြီး ဝယ်ယူသူများသည် PayPay app ဖြင့် Scan ဖတ်ပြီး အလွယ်တကူ ငွေပေးချေရန် အတွက် ဖြစ်တယ်။```Note: QR Code သည် time limit 5 mins ပဲ ရှိလို့  5 mins ကျော် ရင်  Scan ဖတ်လို့လည်း မရတော့ ပါ။ Expired ဖြစ်သွားပါမည်။ ```
    #### Usage
    ```
    PAYPAY.QRCodeCreate(payload, (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```

  ### 2. Delete a QR Code
  - Delete QR Code သည် PayPay app ဖြင့် Scan မဖတ်မည် Delete လုပ်ရန်အတွက်ဖြစ်သည်။```Note: QR Code သည် time limit 5 mins ပဲ ရှိလို့  5 mins ကျော် ရင် Delete  လုပ်လို့ မရတော့ ပါ။ Expired ဖြစ်သွားပါမည်။ ```
    ### Usage 
    ```
    PAYPAY.QRCodeDelete(Array(codeId), (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```

  ### 3. Get Payment Details
  - Get Payment Details သည် ဝယ်သူက Scan ဖတ်ငွေပေးချေပြီးနောက် ပေးချေခဲ့သော ကုန်ပစ္စည်း အမျိုးအစား အရေအတွက်  နှင့် amountကို ပြန်ရယူရန် အတွက်ဖြစ်ပါသည်။
    ### Usage
    ```
    PAYPAY.GetCodePaymentDetails(merchantPaymentId, (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```

  ### 4. Cancel a Payment
  - Cancel a Payment သည် အရောင်းဆိုင်တွင် ပေးချေပြီးသော ကုန်ပစ္စည်း ကို ပြန်ပယ်ဖျက်သော အခါသုံးပါတယ်။ Cancel လုပ်လိုက်ရင် ပေးချေပြီးသော ကျသင့်ခဲ့သောငွေများသည် ဝယ်သူ၏ PayPay Wallet ထဲသို့ ပြန်ရောက်ရှိသွားမည်ဖြစ်သည်။ ```Note: Calcel Payment သည် နောက်နေ့ မနက် 00:14:59 AM အထိသာ အသုံးပြုလို့ရမည်ဖြစ်သည်။ ```
    ### Usage
    ```
    PAYPAY.PaymentCancel(Array(merchantPaymentId), (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```

  ### 5. Refund Payment
  - Refund Payment သည် ဝယ်သူများဘက်မှာ ပေးချေခဲ့ပြီးသော ကုန်ပစ္စည်းများကို ပြန်ပယ်ဖျက်သော အခါ ရောင်းသူများဘက်မှ ငွေပြန်အန်းသော အခါ အသုံးပြုပါသည်။
    ### Usage
    ```
    PAYPAY.PaymentRefund(payload, (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```

  ### 6. Fetch refund status and details
  -  Fetch refund status and details သည် ပြန်အန်းငွေပမာဏ နှင့် မည်သည့် ကုန်ပစ္စည်း အတွက် ပြန်အန်းခဲ့သည်ကို အသေးစိတ် ကြည့်ရန်အတွက် အသုံးပြုပါသည်။
     ### Usage
     ```
     PAYPAY.GetRefundDetails(Array(merchantRefundId), (response) => {
      console.log(response.BODY.resultInfo.code);
     });
     ```

  ### 7. Capture a payment authorization
  - Capture a payment authorization သည် PreAuth ဖြင့် ငွေပေးချေသူများထံမှ ငွေဖြတ်ရန်အတွက် အသုံးပြုပါသည်။ PreAuth သည် နောက်မှ ငွေပေး‌ချေမယ့် အရာများတွင်အသုံးပြုသည်။ PreAuth နှင့် ငွေပေးချေလျှင် ဝယ်သူ၏ PayPay Wallet ထဲမှာ ကျသင့်ငွေ ပမာဏကို ဖြတ်လိုက်ပေမယ့် အ‌ရောင်းဆိုင်သို့ မရောက်သေးဘဲ ကြားထဲတွင် Hold လုပ်ထားခြင်းဖြစ်ပါသည်။ အမှန်တကယ် ငွေပေးခြေသော အခါ Capture a payment authorization ကို အသုံးပြုရပါသည်။```Eg: Delivery App တစ်ခုတွင် PreAuth ဖြစ်ပစ္စည်း မှာယူပြီး အမှန်တကယ် ပစ္စည်း ရသော အချိန်တွင်  Capture a payment ကို အသုံးပြုရမည်ဖြစ်သည်။ Note: PreAuth အတွက်  payload တွင် isAuthorization: true ဖြစ်ရပါမည်။```
    ### Usage
    ```
    PAYPAY.PaymentAuthCapture(payload, (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```

  ### 8. Revert a payment authorization
  - Revert a payment authorization သည် PreAuth(Hold) လုပ်ထားသော ငွေပေးချေမှု ကို Revert ပြန်လုပ်သော အချိန်တွင် အသုံးပြုရပါသည်။```Noted: Refund သည် Payment Success ဖြစ်သော အခြေအနေတွင် ငွေပြန်အန်းရန်းအသုံးပြုပြီး Revert Payment သည် PreAuth(Hold) လုပ်ထားသော ငွေပေးချေမှု ကို Revert လုပ်ရန် အသုံးပြုပါသည်။```
    ### Usage
    ```
    PAYPAY.PaymentAuthRevert(payload, (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```

## App Invoke
   - App Invoke သည် Dynamic QR Code နှင့် အသုံးပြုပုံချင်း အတူတူပဲ ဖြစ်ပါသည်။```Payload data ကွာခြားနိုင်ပါသည်```

   ### Dynamic QR Code vs App Invoke
   - ```Dynamic QR Code သည် အရောင်းဆိုင်များတွင် ထားရှိသော Tablet, Pc etc... မှတစ်ဆင့် ဝယ်သူမှမိမိ PayPay App ဖြင့် Scan ဖတ်ပြီး ငွေပေးချေရာ တွင် အသုံးပါသည်။```
   - ```App Invoke သည် E-commerce website or အရောင်းအဝယ် Websit တစ်ခုခု အတွက် ငွေပေးချေရာ တွင် အသုံးပြုရပါသည်။ ငွေပေးချေရာ တွင် ဝယ်သူ၏ device အတွင်း PayPay App ရှိလျှင် PayPay app ထဲသို့ ရောက်ရှိသွားမည်ဖြစ်ပြီး PayPay app မရှိလျှင် paypay payment website မှ ငွေပေးချေရမည်ဖြစ်သည်။```


## Server Call
 
  ### 1. Native Payment
  - Native Payment ကို အသုံးပြုရန်အတွက် အသုံးပြုသူသည် မိမိ PayPay Account နှင့် Link ချိတ်ထားရန်လိုအပ်ပါသည်။```Eg: Native Payment သည် Pay Btn ကို နှိပ်လိုက် ရုံဖြစ် Payment Completed(Success) ဖြစ်သွားမည် ဖြစ်ပါသည်။ App Invoke လို app ထဲဝင်သွားတာတို့ or paypay website ထဲ ဝင်ပြီး ငွေပေးချေရတဲ့ အဆင့် ပါတော့ မည် မဟုတ်ပါ။```
   
  #### - Acquire User Authorization
  - Acquire User Authorization သည် မိမိ PayPay Account သို့ Link ချိတ်ရန်အတွက် အသုံးပြုပါသည်။ payload အတွင်းရှိ ```redirectUrl``` သည် HTTPS ဖြစ်မှသာ PayPay response ပြန်မည်ဖြစ်သည်။

    #### Usage 
    ```
    PAYPAY.getUserAuthorizationStatus(userAuthorizationId, (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```

  #### - Unlink User

  - Unlink User သည် PayPay account နှင့် Like ချိတ်ထားတာကို ပြန်ဖြုတ်ရန်အတွက် အသုံးပြုပါသည်။
    #### Usage
    ```
    PAYPAY.unlinkUser(userAuthorizationId, (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```
  #### - Create a Payment
  - Create Payment သည် Native Payment အတွက် ငွေပေးချေရာတွင် အသုံးပြုပါသည်။ 
    #### Usage
    ```
    PAYPAY.CreatePayment(payload, (response) => {
      console.log(response.BODY.resultInfo.code);
    });
    ```

  ### 2. Continue Payment
  #### - Create a continuous payment
  -  Continue Payment သည် corporate customers များ အတွက်သာဖြစ်ပြီး လစဥ် ကြေးအမြဲ ပေးဆောင်ရသည့် customer service ဝန်တောင်မှု များအတွက် အဆင်ပြေစေရန်အတွက် အသုံးပြုရပါသည်။ ```Eg: skynet bill ကို လစဥ် ပေးဆောင်ရန် အတွက် Continue Payment ကို အသုံးပြုရပါမည်။ etc...```
     #### Usage
     ```
     PAYPAY.CreateSubscriptionPayment(payload, (response) => { 
       console.log(response.BODY.resultInfo.code); 
     });
     ```
  #### - Request Money
  - Request Money သည် Order များအတွက် အသုံးပြုပါသည်။ payload တွင် expired time ပါရှိမည်ဖြစ်ပါသည်။ Request Money သည် order Created ဖြစ်ပြီးနောက် payment ကို သတ်မှတ်ပေးလို့ပါတယ်```Eg: pay with Native or App Invoke and Booking System များအတွက် အသုံးပြုသင့်ပါသည်။```

