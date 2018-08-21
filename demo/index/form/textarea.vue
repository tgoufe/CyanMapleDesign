<template>
    <div class="padding20">
        <div class="example tag-container">
            <cmui-textarea
            v-bind="options"
            v-model="options.value"
            :target-class="targetClass"
            >
                阿斯蒂芬
            </cmui-textarea>
        </div>
        <div class="form tag-container config">
            <cmui-list :space="10">
                <cmui-list-item>
                    <div class="flex-container">
                        <label>文本显示位置</label>
                        <div class="">
                            <cmui-radio name="align" v-model="options.align" label="left">
                                左侧
                            </cmui-radio>
                            <cmui-radio name="align" v-model="options.align" label="right">
                                右侧
                            </cmui-radio>
                        </div>
                    </div>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.auto" target-class="switch" :flex="true">
                        是否自动高度
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox @change="limitMax" v-model="max" target-class="switch" :flex="true">
                        限制最大输入数量
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.flex" target-class="switch" :flex="true">
                        是否使用flex结构
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <p>target-class</p>
                    <div class="">
                        <cmui-checkbox v-for="item in targetClassList" v-model="item.value">
                            {{item.text}}
                        </cmui-checkbox>
                    </div>
                </cmui-list-item>
            </cmui-list>
        </div>
        <cmui-list>
            <cmui-list-item v-for="item in imgData">
                <div style="min-height: 50px">
                    <cmui-img :lazy-load="true" :src="item" :pre-view="true"></cmui-img>
                </div>
            </cmui-list-item>
        </cmui-list>
        
    </div>
</template>
<style lang="scss">

</style>
<script>
    let imgData=['//img1.tg-img.com/seller/201808/10/E197D591-CD27-43AA-A104-CF14F92B6BC5.png!y',
'//img1.tg-img.com/seller/201808/14/66EB253D-DF6D-40BA-92C6-C37AF1C7A8A9.jpg!y',
'//img1.tg-img.com/seller/201808/14/5B76808E-9AEC-4B1F-B737-171CF82A0FB2.png!y',
'//img1.tg-img.com/seller/201808/09/7A10A3BC-29C4-47CA-A376-95EC68C2E6D6.png!y',
'//img1.tg-img.com/seller/201808/14/AB15D739-1298-4B14-93B3-4D61D77A8768.png!y',
'//img1.tg-img.com/seller/201808/09/BF8542CA-3384-4155-A942-0C0B8347C1C1.jpg!y',
'//img1.tg-img.com/seller/201808/10/03665CE2-A3F7-4EBE-8FB6-5A7918C96113.jpg!y',
'//img1.tg-img.com/seller/201808/10/51F00559-7922-4FE6-8987-4FF32FFBAAFF.jpg!y',
'//img1.tg-img.com/seller/201808/10/E197D591-CD27-43AA-A104-CF14F92B6BC5.png!y',
'//img1.tg-img.com/seller/201808/14/66EB253D-DF6D-40BA-92C6-C37AF1C7A8A9.jpg!y',
'//img1.tg-img.com/seller/201803/20/54FC650E-5D4E-4F4B-BAA3-AF9804BE97F9.png!y',
'//img1.tg-img.com/seller/201803/20/CB723CA4-C062-4238-99B8-E701A2132CE6.png!y',
'//img1.tg-img.com/seller/201803/20/095186AB-9403-4A9E-A533-435A94EAAE7A.png!y',
'//img1.tg-img.com/seller/201803/20/B2E8C39B-7727-4334-B6C5-0B5699CA7BDC.png!y',
'//img1.tg-img.com/seller/201803/20/2244F92F-1992-4C79-8F03-7026A4E50027.png!y',
'//img1.tg-img.com/seller/201808/09/26433E96-22A1-4BD3-A882-376975D4EED1.png!y',
'//img1.tg-img.com/seller/201611/25/5D8A2D1A-FA1B-44E6-8280-488FFE53D9D4.jpg!y',
'//img1.tg-img.com/seller/201803/20/EBC18EFE-0AC7-4004-AA1C-EDC8D41CBCF2.png!y',
'//image1.51tiangou.com/tgou2/img2/index/title-timeSelf.png',
'//img1.tg-img.com/seller/201806/05/81E15BD0-0658-45C1-A9E1-31DB568915C2.jpg!m',
'//img1.tg-img.com/seller/201803/28/B5C47CA3-EA7F-4547-AD2B-3F1FE86D32FD.jpg!m',
'//img1.tg-img.com/seller/201807/16/306C6F29-AC92-4662-BA32-A60920691761.jpg!m',
'//img1.tg-img.com/seller/201807/05/E09DFAFE-F08B-453D-8FF4-F1BE6DDB83EF.jpg!m',
'//img1.tg-img.com/seller/201806/02/0E80C7C1-AF7D-4BE0-8FC2-7FCD8D618A1E.jpg!m',
'//img1.tg-img.com/product/201808/13/67E222B2-64E1-463A-ACD7-B9C93FF94996.jpg!m',
'//img1.tg-img.com/seller/201804/18/2289B0BB-314B-4C9A-8867-82D39012CD1B.jpg!m',
'//img1.tg-img.com/seller/201806/27/C7028428-1B62-41F4-8F79-6AE085E36C7D.jpg!m',
'//img1.tg-img.com/seller/201808/08/1FEA886E-4D1D-4F59-A801-5AF8E393CA93.jpg!y',
'//img1.tg-img.com/seller/201808/10/A9A854E1-B5E9-41AB-B76D-039F0F383156.jpg!y',
'//img1.tg-img.com/seller/201808/02/8837E490-FC52-4F6B-A9F1-1455121663A9.png!y',
'//img1.tg-img.com/seller/201808/10/7AC2C181-C514-4D86-89AC-4AB61310810E.png!y',
'//img1.tg-img.com/seller/201804/08/FDFD2B46-A489-4ADD-A4A6-9C8BE3BE5787.png!y',
'//img1.tg-img.com/seller/201808/13/D4249EA9-C1B1-43A7-AE22-94C6EC1B198A.jpg!y',
'//img1.tg-img.com/seller/201808/13/C7674C59-BF37-4758-A19E-076D1FACF831.jpg!y',
'//img1.tg-img.com/seller/201808/14/52D55311-F681-45C5-A1E7-78E298DDAA09.jpg!y',
'//img1.tg-img.com/seller/201808/14/9A9491C5-3E13-4A63-A4C4-DDBF00EC9DA6.jpg!y',
'//img1.tg-img.com/seller/201808/14/D75CF379-A233-45A0-8663-0DB91CFEEA84.jpg!y',
'//img1.tg-img.com/seller/201808/14/FAF41132-4F26-4B86-89A2-582FC8492053.jpg!y',
'//img1.tg-img.com/seller/201807/30/2F90718A-036A-4EBA-B893-DF89FC0BB2F4.jpg!y',
'//img1.tg-img.com/seller/201808/07/1742ADE5-1E00-4CFB-83F7-100762C2A0DC.jpg!y',
'//img1.tg-img.com/seller/201807/31/D284B5CF-CB58-4348-8DF2-742B38DE1FA8.jpg!y',
'//img1.tg-img.com/seller/201808/14/396CF491-CE6E-43A8-A920-21833B1EEEAA.jpg!y',
'//img1.tg-img.com/seller/201807/23/FDA91309-53D1-47E6-AF6B-5E57567F3180.jpg!y',
'//img1.tg-img.com/seller/201808/07/BCD6C892-C21A-4FEF-AC66-5CB492AAB71A.jpg!y',
'//img1.tg-img.com/seller/201808/14/5C22CC97-AE29-4046-9E3C-64694F37A41C.jpg!y',
'//img1.tg-img.com/seller/201808/14/65AE094A-20C9-4DE1-B0BA-7B816A2DCC14.jpg!y',
'//img1.tg-img.com/seller/201808/14/CC6640C6-061F-4B78-9007-C3F71DB449FA.png!y',
'//img1.tg-img.com/seller/201808/14/97E6510C-22DC-404A-9774-481339627BC0.png!y',
'//img1.tg-img.com/seller/201804/07/285B2AB0-847C-432B-A7A2-6324B32EEF1B.png!y',
'//img1.tg-img.com/seller/201808/09/358E327D-FEA6-4209-AC27-77F1BAE269EC.jpg!y',
'//img1.tg-img.com/seller/201808/10/5B7FD238-C68D-4DAA-A9FF-00AAC17E50BC.png!y',
'//img1.tg-img.com/seller/201808/09/B211D27D-D4C4-4D8E-9850-5A7EA33FC89B.jpg!y',
'//img1.tg-img.com/seller/201808/09/127B44C0-F1AB-48BB-8F29-0A5F34BF50E6.jpg!y',
'//img1.tg-img.com/seller/201808/09/32263DE9-2041-4F9B-9A6E-D23F2E4A2883.jpg!y',
'//img1.tg-img.com/seller/201808/10/5482F310-6024-4488-9BC3-9C53A51E9B5D.jpg!y',
'//img1.tg-img.com/seller/201808/09/87E50741-754F-40A6-A032-1C9BED01CEF7.jpg!y',
'//img1.tg-img.com/seller/201808/09/5E582600-C534-409A-B111-7EC3381EF29C.jpg!y',
'//img1.tg-img.com/seller/201808/09/BC831911-B347-45F7-BB99-95F2DBABEE49.jpg!y',
'//img1.tg-img.com/seller/201808/10/5ECA2E01-ED0B-4603-92D4-DDD4643625C5.jpg!y',
'//img1.tg-img.com/seller/201808/09/BF474B1F-4DE7-486D-92A6-48E28CE216E0.png!y',
'//img1.tg-img.com/seller/201808/09/24B217C4-C6A5-4EAC-84AE-401E50F94137.png!y',
'//img1.tg-img.com/seller/201808/10/8497A1D5-25B2-4634-B53C-10013635D6DB.png!y',
'//img1.tg-img.com/seller/201803/20/ADF83934-66BA-4F5D-836D-7230E3851B43.png!y',
'//img1.tg-img.com/seller/201808/09/FF34438A-B984-44B0-95C1-3995032BBD6A.png!y',
'//img1.tg-img.com/seller/201808/10/80DA06D5-FD85-4CD2-9C4A-B22F8B9086D5.jpg!y',
'//img1.tg-img.com/seller/201808/09/D76B9AA5-F6A7-4170-9427-0576479E400B.jpg!y',
'//img1.tg-img.com/seller/201808/10/CB77A99C-E4BB-45B9-BC4A-267D736BA8C2.jpg!y',
'//img1.tg-img.com/seller/201808/09/39AFD434-CFAE-4CFC-A09A-F25387B79364.jpg!y',
'//img1.tg-img.com/seller/201808/10/60AB26DF-A02C-4195-ACE1-04658C801455.jpg!y',
'//img1.tg-img.com/seller/201808/09/912C7EE0-B436-4474-9219-86811DBD6EC4.jpg!y',
'//img1.tg-img.com/seller/201808/10/3A3F0AA4-773E-4E8A-AE58-BE0528F84230.jpg!y',
'//img1.tg-img.com/seller/201803/22/89B798F7-F2D3-4D14-BBD1-AD31D72DD898.jpg!y',
'//img1.tg-img.com/seller/201808/13/624AB39C-0DA4-4E04-8231-4B515D4B9B6D.jpg!y',
'//img1.tg-img.com/seller/201808/02/86D573DD-C781-4F56-98B7-3A7C37107EC4.jpg!y',
'//img1.tg-img.com/seller/201808/13/A93CC58D-2AA0-4E90-993C-AC35B2EF2499.jpg!y',
'//img1.tg-img.com/seller/201808/02/C769191B-393C-4749-9FBC-210BB3AEED60.jpg!y',
'//img1.tg-img.com/seller/201808/02/690ED103-F61C-46ED-A1B1-74E8CD3353DC.jpg!y',
'//img1.tg-img.com/seller/201808/14/071518AB-B326-49F3-90B5-772EC30BD01C.jpg!y',
'//img1.tg-img.com/seller/201808/02/B95724A9-0ABC-414E-82BD-99C8DEA3A62A.jpg!y',
'//img1.tg-img.com/seller/201803/19/D8525700-7387-431D-9475-004EC87FBC94.jpg!y',
'//img1.tg-img.com/seller/201808/13/DD7867B6-E26C-44A1-97D5-0ABEFE57C464.jpg!y',
'//img1.tg-img.com/seller/201807/17/4AD27362-30D4-43D8-AFF8-BF041631A465.jpg!m',
'//img1.tg-img.com/seller/201807/19/768708C4-3B65-4F98-A457-035DDC80BD77.jpg!m',
'//img1.tg-img.com/seller/201807/19/4A7C6F7B-7E8B-463B-8FDD-AF1ABB1A982A.jpg!m',
'//img1.tg-img.com/seller/201807/19/A448B6FB-2C0D-4408-8929-1F86E97E7905.jpg!m',
'//img1.tg-img.com/seller/201807/17/81488520-9A5B-4F3B-AA03-D9524CFD29A5.jpg!m',
'//img1.tg-img.com/seller/201807/17/BD75A5B7-2842-4B2A-9A47-971732C7DA7E.jpg!m',
'//img1.tg-img.com/seller/201807/19/255D4227-ECCA-4C2A-9443-C2426C4C37DE.jpg!m',
'//img1.tg-img.com/seller/201808/13/C097032B-7932-460D-968A-4BF087B33FDD.jpg!y',
'//img1.tg-img.com/product/201803/26/283EF84A-7282-459F-90D0-10F44BE0201B.jpg!m',
'//img1.tg-img.com/product/201803/26/3FE44597-B346-4EE9-AE66-DBDF58847520.jpg!m',
'//img1.tg-img.com/product/201803/26/C448C355-E891-47A8-8B59-1E92FC731FE2.jpg!m',
'//img1.tg-img.com/product/201803/26/AC32526A-19AB-4793-8031-8428A675B7AD.jpg!m',
'//img1.tg-img.com/product/201803/26/7A259A90-3704-4477-B13C-B4D56E7A2503.jpg!m',
'//img1.tg-img.com/product/201806/10/BEE49D89-49E2-4505-B872-9AE6682E8866.jpg!m',
'//img1.tg-img.com/product/201808/04/97B1CD49-B318-4847-ABCF-42B157E4527A.jpg!m',
'//img1.tg-img.com/seller/201808/09/F752D0C5-5D9D-4DEE-B6B2-00DD1725EDFD.jpg!y',
'//img1.tg-img.com/seller/201807/25/25158B74-5259-406D-A673-770228E6B21B.jpg!m',
'//img1.tg-img.com/seller/201807/13/BFA2DF51-A8E8-41F7-9F4E-D2CA017C50EF.jpg!m',
'//img1.tg-img.com/seller/201807/06/BC99F69B-949E-42E5-91EB-50416FC2A0CC.jpg!m',
'//img1.tg-img.com/seller/201807/04/39CB0141-A711-43E9-923B-F9F8FF98D80B.jpg!m',
'//img1.tg-img.com/seller/201806/14/4F41B912-5D22-4B2F-B79D-D6984F679B22.jpg!m',
'//img1.tg-img.com/seller/201805/09/F843CE75-5A70-4CC0-B3E7-0B282C5B1D05.jpg!m',
'//img1.tg-img.com/seller/201805/09/A288AC0D-069A-4D65-BAA1-08BA14A514D6.jpg!m',
'//img1.tg-img.com/seller/201803/20/D0DE404B-9394-4F32-9FDE-AF0098C2B8E4.png!y',
'//img1.tg-img.com/seller/201808/09/308E6CCD-5130-4EFB-BD91-23F2DE53DF63.jpg!s',
'//img1.tg-img.com/seller/201808/14/6FD5ED83-6770-4F29-B8DB-A532647683A5.JPG!s',
'//img1.tg-img.com/seller/201808/03/26E9913F-8C25-4F97-8CD6-2BF97EF19224.jpg!s',
'//img1.tg-img.com/seller/201808/15/D73BE05A-E010-4C0E-8213-9B2E37736F18.jpg!s'];
export default {
  data: function() {
    return {
      options: {
        auto:false,
        value:'',
        align:'left',
        flex:false,
        max:-1
      },
      targetClassList:['radius','reverse','center','bottom'].map(item=>({text:item,value:false})),
      imgData
    };
  },
  computed:{
    targetClass(){
      return this.targetClassList.filter(item=>item.value).map(item=>item.text).join(' ');
    }
  },
  methods:{
    limitMax(value){
        this.options.max=value?50:-1;
    }
  }
};
</script>
