<template>
  <view
    class="heichi100 paddingx25"
    >
    <scroll-view
      scroll-y="true"
      class="heichi100"
    >
      <view
        class="text-center fon50 fonweight margtop60"
      >
        隐私协议
      </view>
      <view
        class="margtop60 marginbottom20"
        @tap="changeStatus(0)"
      >
        <view class="text-center margtop60">引言</view>
      </view>
      <view
        v-show="textStatus[0]"
        class="fon28 indent line-heichi40 marginy20"
      >
        深赛科技重视用户的隐私。您在使用我们的服务时，我们可能会收集和使用您的相关信息。我们希望通过本《隐私政策》向您说明，在使用我们的服务时，我们如何收集、使用、储存和分享这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。本《隐私政策》与您所使用的服务息息相关，希望您仔细阅读，在需要时，
        按照本《隐私政策》的指引，作出您认为适当的选择。本《隐私政策》中涉及的相关技术词汇，我们尽量以简明扼要的表述，并提供进一步说明的链接，以便您的理解。
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(1)"
      >
        1.&nbsp;我们可能收集的信息
      </view>
      <view
        v-show="textStatus[1]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          (1)&nbsp;我们提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。
        </view>
        <view>
          (2)&nbsp;您在注册账户或使用我们的服务时，向我们提供的相关个人信息，例如电话号码、电子邮件或银行卡号等；
        </view>
        <view>
          (3)&nbsp;您通过我们的服务向其他方提供的共享信息，以及您使用我们的服务时所储存的信息。
        </view>
        <view>
          (4)&nbsp;其他方使用我们的服务时所提供有关您的共享信息。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(2)"
      >
        2.&nbsp;我们可能如何使用信息
      </view>

      <view
        v-show="textStatus[2]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          我们可能将在向您提供服务的过程之中所收集的信息用作下列用途：
        </view>
        <view>
          (1)&nbsp;向您提供服务；
        </view>
        <view>
          (2)&nbsp;在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；
        </view>
        <view>
          (3)&nbsp;帮助我们设计新服务，改善我们现有服务；
        </view>
        <view>
          (4)&nbsp;使我们更加了解您如何接入和使用我们的服务，从而针对性地回应您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示，或对您和其他用户作出其他方面的回应；
        </view>
        <view>
          (5)&nbsp;向您提供与您更加相关的广告以替代普遍投放的广告；
        </view>
        <view>
          (6)&nbsp;评估我们服务中的广告和其他促销及推广活动的效果，并加以改善；
        </view>
        <view>
          (7)&nbsp;软件认证或管理软件升级；
        </view>
        <view>
          (8)&nbsp;让您参与有关我们产品和服务的调查。
        </view>
        <view>
          为了让您有更好的体验、改善我们的服务或您同意的其他用途，在符合相关法律法规的前提下，我们可能将通过某一项服务所收集的信息，以汇集信息或者个性化的方式，
          用于我们的其他服务。例如，在您使用我们的一项服务时所收集的信息，可能在另一服务中用于向您提供特定内容，或向您展示与您相关的、非普遍推送的信息。
          如果我们在相关服务中提供了相应选项，您也可以授权我们将该服务所提供和储存的信息用于我们的其他服务。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(3)"
      >
        3.&nbsp;您如何访问和控制自己的个人信息
      </view>
      <view
        v-show="textStatus[3]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <text>
          我们将尽一切可能采取适当的技术手段，保证您可以访问、更新和更正自己的注册信息或使用我们的服务时提供的其他个人信息。在访问、更新、更正和删除前述信息时，
          我们可能会要求您进行身份验证，以保障账户安全。
        </text>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(4)"
      >
        4.&nbsp;我们可能分享的信息
      </view>

      <view
        v-show="textStatus[4]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          除以下情形外，<text class="fon28">
            未经您同意
          </text>，我们以及我们的关联公司不会与任何第三方分享您的个人信息：
        </view>
        <view>
          (1)&nbsp;我们以及我们的关联公司，可能将您的个人信息与我们的关联公司、合作伙伴及第三方服务供应商、承包商及代理
          （例如代表我们发出电子邮件或推送通知的通讯服务提供商、为我们提供位置数据的地图服务供应商）分享（他们可能并非位于您所在的法域），用作下列用途：
          <view class="fon28 indent">
            <view>
              a.&nbsp;向您提供我们的服务；
            </view>
            <view>
              b.&nbsp;实现“我们可能如何使用信息”部分所述目的；
            </view>
            <view>
              c.&nbsp;履行我们在《服务说明》或本《隐私政策》中的义务和行使我们的权利；
            </view>
            <view>
              d.&nbsp;理解、维护和改善我们的服务。
            </view>
          </view>
        </view>
        <view>
          如我们或我们的关联公司与任何上述第三方分享您的个人信息，我们将努力确保该等第三方在使用您的个人信息时遵守本《隐私政策》及我们要求其遵守的其他适当的保密和安全措施。
        </view>
        <view>
          <view>
            (2)&nbsp;随着我们业务的持续发展，我们以及我们的关联公司有可能进行合并、收购、资产转让或类似的交易，您的个人信息有可能作为此类交易的一部分而被转移。我们将在转移前通知您。
          </view>
          <view>
            (3)&nbsp;我们或我们的关联公司还可能为以下需要而保留、保存或披露您的个人信息：
            <view class="fon28 indent">
              <view>
                a.&nbsp;遵守适用的法律法规；
              </view>
              <view>
                b.&nbsp;遵守法院命令或其他法律程序的规定；
              </view>
              <view>
                c.&nbsp;遵守相关政府机关的要求；
              </view>
              <view>
                d.&nbsp;为遵守适用的法律法规、维护社会公共利益，或保护我们的客户、我们或我们的集团公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途。
              </view>
            </view>
          </view>
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(5)"
      >
        5.&nbsp;信息安全
      </view>
      <view
        v-show="textStatus[5]"
        class="fon28 indent line-heichi40 marginy20"
      >
       
          我们仅在本《隐私政策》所述目的所必需的期间和法律法规要求的时限内保留您的个人信息。
          我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。例如，在某些服务中，我们将利用加密技术（例如SSL）来保护您提供的个人信息。
          但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。
          您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。
        
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(6)"
      >
        6.&nbsp;您分享的信息
      </view>
      <view
        v-show="textStatus[6]"
        class="fon28 indent line-heichi40 marginy20"
      >
        我们的多项服务，可让您不仅与自己的社交网络，也与使用该服务的所有用户公开分享您的相关信息，例如，您可以将您截取的影像资料与所有服务用户已经第三方社交网络公开分享。
        使用我们服务的其他用户也由可能分享与您有关的已公开的影像资料。
        <text class="fonweight">
          因此，请您谨慎考虑通过我们的服务上传、发布和交流的信息内容。
        </text>在一些情况下，您可通过我们某些服务的隐私设定来控制有权浏览您共享信息的用户范围。
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(7)"
      >
        7.&nbsp;我们可能如何收集信息
      </view>

      <view
        v-show="textStatus[7]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          在合作场馆，我们通过公开安置的摄像机来获取营业时间内运动人群的影像资料。
        </view>
        <view>
          我们或我们的第三方合作伙伴，可能通过cookies和web beacon收集和使用您的信息，并将该等信息储存为日志信息。
        </view>
        <view>
          我们使用自己的cookies和web beacon，目的是为您提供更个性化的用户体验和服务，并用于以下用途：
        </view>
        <view class="fon28 indent line-heichi40">
          (1)&nbsp;记住您的身份。例如：cookies和web beacon有助于我们辨认您作为我们的注册用户的身份，或保存您向我们提供的有关您的喜好或其他信息；
        </view>
        <view class="fon28 indent line-heichi40">
          (2)&nbsp;分析您使用我们服务的情况。例如，我们可利用cookies和web beacon来了解您使用我们的服务进行什么活动，或哪些网页或服务最受您的欢迎；
        </view>
        <view class="fon28 indent line-heichi40">
          (3)&nbsp;广告优化。Cookies和web beacon有助于我们根据您的信息，向您提供与您相关的广告而非进行普遍的广告投放。
        </view>
        <view>
          我们为上述目的使用cookies和web beacon的同时，可能将通过cookies和web beacon收集的非个人身份信息，经统计加工后提供给广告商或其他合作伙伴，
          用于分析用户如何使用我们的服务，并用于广告服务。
        </view>
        <view>
          我们的产品和服务上可能会有广告商或其他合作方放置的cookies和web beacon。这些cookies和web beacon可能会收集与您相关的非个人身份信息，以用于分析用户如何使用该等服务、向您发送您可能感兴趣的广告，或用于评估广告服务的效果。这些第三方cookies和web beacon收集和使用该等信息，
          不受本《隐私政策》约束，而是受相关使用者的隐私政策约束，我们不对第三方的cookies或web beacon承担责任。
        </view>
        <view>我们收集唯一设备识别码（IMEI/Mac/android ID/IDFA/OPENUDID/GUID、SIM 卡 IMSI 信息）以提供统计分析服务，并通过地理位置校准报表数据准确性，提供基础反作弊能力</view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(8)"
      >
        8.&nbsp;我们可能向您发送的邮件和信息
      </view>
      <view
        v-show="textStatus[8]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view class="fonweight">
          邮件和消息推送
        </view>
        <view>您在使用我们的服务时，我们可能使用您的信息向您的设备发送电子邮件、新闻或推送通知。如您不希望收到这些信息，可以按照我们的相关提示，在设备上选择取消订阅。</view>
        <view class="fonweight">
          与服务有关的公告
        </view>
        <view>我们可能在必要时（例如因系统维护而暂停某一项服务时）向您发出与服务有关的公告。您可能无法取消这些与服务有关、性质不属于推广的公告。</view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(9)"
      >
        9.&nbsp;隐私政策的使用例外
      </view>
      <view
        v-show="textStatus[9]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>我们的服务可能包括或链接至第三方提供的社交媒体或其他服务（包括网站）。例如：</view>
        <view class="fon28 indent">
          (1)&nbsp;您利用 “分享”键将某些内容分享到我们的服务，或您利用第三方连线服务登录我们的服务。这些功能可能会收集您的相关信息（包括您的日志信息），并可能在您的电脑装置cookies，从而正常运行上述功能；
        </view>
        <view class="fon28 indent">
          (2)&nbsp;我们通过广告或我们服务的其他方式向您提供链接，使您可以接入第三方的服务或网站。
        </view>
        <view>
          该等第三方社交媒体或其他服务可能由相关的第三方或我们运营。您使用该等第三方的社交媒体服务或其他服务（包括您向该等第三方提供的任何个人信息），
          须受该第三方的服务条款及隐私政策（而非《通用服务条款》或本《隐私政策》）约束，您需要仔细阅读其条款。
          <text class="fonweight">
            本《隐私政策》仅适用于我们所收集的信息，并不适用于任何第三方提供的服务或第三方的信息使用规则，我们对任何第三方使用由您提供的信息不承担任何责任。
          </text>
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(10)"
      >
        10.&nbsp;未成年人使用我们的服务
      </view>
      <view
        v-show="textStatus[10]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <text>我们鼓励父母或监护人指导未满十八岁的未成年人使用我们的服务。我们建议未成年人鼓励他们的父母或监护人阅读本《隐私政策》，并建议未成年人在提交的个人信息之前寻求父母或监护人的同意和指导。</text>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(11)"
      >
        11.&nbsp;隐私政策的使用范围
      </view>
      <view
        v-show="textStatus[11]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          除某些特定服务外，我们所有的服务均适用本《隐私政策》。这些特定服务将适用特定的隐私政策。<text style="font-weight: 600;">
            针对某些特定服务的特定隐私政策，将更具体地说明我们在该等服务中如何使用您的信息。
          </text>
          该特定服务的隐私政策构成本《隐私政策》的一部分。<text class="fonweight">
            如相关特定服务的隐私政策与本《隐私政策》有不一致之处，适用该特定服务的隐私政策。
          </text>
        </view>
        <view>除本《隐私政策》另有规定外，本《隐私条款》所用词语将与《服务说明》所定义的词语具有相同的涵义。</view>
        <view>请您注意，本《隐私政策》不适用于以下情况：</view>
        <view style="text-indent: 2em;">
          (1)&nbsp;通过我们的服务而接入的第三方服务（包括任何第三方网站）收集的信息；
        </view>
        <view style="text-indent: 2em;">
          (2)&nbsp;通过在我们服务中进行广告服务的其他公司或机构所收集的信息。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(12)"
      >
        12.&nbsp;变更
      </view>
      <view
        v-show="textStatus[12]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          我们可能适时修订本《隐私政策》的条款，该等修订构成本《隐私政策》的一部分。<text style="font-weight: 600;">
            如该等修订造成您在本《隐私政策》下权利的实质减少，
            我们将在修订生效前通过在主页上显著位置提示或向您发送电子邮件或以其他方式通知您。
            在该种情况下，若您继续使用我们的服务，即表示同意受经修订的本《隐私政策》的约束。
          </text>
        </view>
      </view>
      <view class="heichixu80" />
    </scroll-view>
  </view>
</template>

<script>
  export default {
    name: "privacy",
    data() {
      return {
        textStatus:[false,false,false,false,false,false,false,false,false,false,false,false,false],
      };
    },
    methods:{
      // 点击改变文字段落的收缩状态
      changeStatus(data){
        this.textStatus = this.textStatus.map((item,index)=>{
          if(data==index){
            return !item
          }
          return item
        })
      },
    },
  };
</script>

<style lang="scss">
  ::-webkit-scrollbar{
    display: none;
  }
  .indent{
    text-indent: 2em;
    text-align: justify;
  }
</style>