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
        服务协议
      </view>
      <view
        class="margtop60 marginbottom20"
        @tap="changeStatus(0)"
      >
        <view class="text-center margtop60">特别提示</view>
      </view>
      <view
        v-show="textStatus[0]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          南京深赛信息科技有限公司（以下简称“深赛科技”）在此特别提醒您（用户）在注册成为用户之前，请认真阅读本《用户协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您谨慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。
        </view>
        <view>
          本协议约定深赛科技与用户之间关于“HiDancing”软件服务（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本服务的个人。本协议可由深赛科技随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在应用中查阅最新版协议条款。在深赛科技修改协议条款后，如果用户不接受修改后的条款，请立即停止使用深赛科技提供的服务，用户继续使用深赛科技提供的服务将被视为接受修改后的协议。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(1)"
      >
        1.&nbsp;账号注册
      </view>
      <view
        v-show="textStatus[1]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          (1)&nbsp;用户在使用本服务前需要注册一个“HiDancing”帐号。“HiDancing”帐号可使用微信号直接登录，也可以使用手机号码绑定注册。深赛科技可以根据用户需求或产品需要对帐号注册和绑定的方式进行变更，而无须事先通知用户。
        </view>
        <view>
          (2)&nbsp;“HiDancing”系基于运动场馆的视频服务产品，用户注册时可选择是否授权深赛科技公开及使用其地理位置信息。
        </view>
        <view>
          (3)&nbsp;在用户使用本服务时，用户可自行决定是否提供个人信息以便更好的展现自己，以及深赛科技可以在必要时联系用户，或为用户提供更好的使用体验。深赛科技搜集的信息包括但不限于用户的姓名、性别、年龄、出生日期、个人职业、公司信息、个性签名等；深赛科技同意对这些信息的使用将受限于第三条用户个人隐私信息保护的约束。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(2)"
      >
        2.&nbsp;服务内容
      </view>

      <view
        v-show="textStatus[2]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          (1)&nbsp;本服务的具体内容由深赛科技根据实际情况提供，包括但不限于录像即时回放、视频截取、视频分享、直播分享、录像分析等。深赛科技可以对其提供的服务予以变更，且深赛科技提供的服务内容可能随时变更；用户将会收到深赛科技关于服务变更的通知。
        </view>
        <view>
          (2)&nbsp;深赛科技提供的服务包含免费服务与收费服务。用户可以通过付费方式购买收费服务，具体方式为：用户通过微信支付、支付宝或其他“HiDancing”平台提供的付费途径支付一定数额的人民币购买“HiDancing”平台的会员身份以及虚拟货币——高手币，从而获得收费服务使用权限。对于收费服务，深赛科技会在用户使用之前给予用户明确的提示，只有用户根据提示确认其同意按照前述支付方式支付费用并完成了支付行为，用户才能使用该等收费服务。支付行为的完成以微信支付或第三方支付平台生成“支付已完成”的确认通知为准。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(3)"
      >
        3.&nbsp;用户个人信息保护
      </view>
      <view
        v-show="textStatus[3]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          (1)&nbsp;用户在注册帐号或使用本服务的过程中，可能需要填写或提交一些必要的个人信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法规的规定，则用户可能无法使用本服务或在使用本服务的过程中受到限制。
        </view>
        <view>
          (2)&nbsp;用户个人信息包括：1）用户自行提供的用户个人信息（如注册时填写的手机号码，电子邮件等个人信息，使用服务时提供的共享信息等）；2）其他方分享的用户个人信息；3）用户截取且不公开的个人视频；4）深赛科技为提供服务而合法收集的用户必要个人信息（如使用服务时系统自动采集的设备或软件信息，浏览历史信息，通讯时间信息等技术信息，用户开启定位功能并使用服务时的地理位置信息等）。其中个人隐私信息是指涉及用户个人身份或个人隐私的信息，比如，用户真实姓名、手机号码、手机设备识别码、IP地址、用户聊天记录、非公开的截取视频。非个人隐私信息是指用户对本服务的操作状态以及使用习惯等明确且客观反映在深赛科技服务器端的基本记录信息、录像视频、个人隐私信息范围外的其它普通信息、公开的截取视频，以及用户同意公开的上述隐私信息。深赛科技保证在取得用户书面同意的情况下收集、使用或公开用户的个人隐私信息，用户同意深赛科技无需获得用户的另行确认与授权即可收集、使用或公开用户的非个人隐私信息。
        </view>
        <view>
          (3)&nbsp;尊重用户个人信息的私有性是深赛科技的一贯制度，深赛科技将采取技术措施和其他必要措施，确保用户个人信息安全，防止在本服务中收集的用户个人信息泄露、毁损或丢失。在发生前述情形或者深赛科技发现存在发生前述情形的可能时，深赛科技将及时采取补救措施并告知用户，用户如发现存在前述情形亦需立即与深赛科技联系。
        </view>
        <view>
          (4)&nbsp;深赛科技未经用户同意不向任何第三方公开、 透露用户个人隐私信息。但以下特定情形除外：
  深赛科技根据法律法规规定或有权机关的指示提供用户的个人隐私信息；
  由于用户将其用户密码告知他人或与他人共享注册帐户与密码，由此导致的任何个人信息的泄漏，或其他非因深赛科技原因导致的个人隐私信息的泄露；
  用户自行向第三方公开其个人隐私信息；
  用户与深赛科技及合作单位之间就用户个人隐私信息的使用公开达成约定，深赛科技因此向合作单位公开用户个人隐私信息；
  任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人隐私信息的泄露；
  用户个人信息已经经过处理无法识别特定个人且不能复原。
  用户自行向第三方公开其个人隐私信息；
        </view>
        <view>
          (5)&nbsp;用户同意深赛科技可在以下事项中使用用户的个人隐私信息：
  深赛科技向用户及时发送重要通知，如软件更新、本协议条款的变更；
  深赛科技内部进行审计、数据分析和研究等，以改进深赛科技的产品、服务和与用户之间的沟通；
  依本协议约定，深赛科技管理、审查用户信息及进行处理措施；
  适用法律法规规定的其他事项。
  任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人隐私信息的泄露；
  用户个人信息已经经过处理无法识别特定个人且不能复原。
  用户自行向第三方公开其个人隐私信息；
  除上述事项外，如未取得用户事先同意，深赛科技不会将用户个人隐私信息使用于任何其他用途。
        </view>
        <view>
          (6)&nbsp;因深赛科技提供的服务系基于场馆地理位置提供服务，用户确认，其地理位置信息为非个人隐私信息，用户成功注册“HiDancing”帐号视为确认授权深赛科技提取、公开及使用用户的地理位置信息。用户地理位置信息将作为用户公开资料之一，由深赛科技向其他用户公开以便深赛科技向用户提供基于地理位置的移动社交服务。如用户需要终止向其他用户公开其地理位置信息，可随时自行关闭位置共享。
        </view>
        <view>
          (7)&nbsp;为了改善深赛科技的技术和服务，向用户提供更好的服务体验，深赛科技或可会自行收集使用或向第三方提供用户的非个人隐私信息。
        </view>
        <view>
          (8)&nbsp;深赛科技保证在合法、正当与必要的原则下收集、使用或者公开用户个人信息且不会收集与提供的服务无关的用户个人信息。
        </view>
        <view>
          (9)&nbsp;深赛科技十分注重保护用户的个人隐私，并制定了《隐私政策》，用户亦可以通过“设置”页面来进行具体查看，用户确认并同意使用深赛科技提供的服务将被视为接受《隐私权政策》。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(4)"
      >
        4.&nbsp;内容规范
      </view>

      <view
        v-show="textStatus[4]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          (1)&nbsp;本条所述内容是指用户使用本服务过程中所截取、制作、发布、传播的任何内容，包括但不限于帐号头像、名称、用户说明等注册信息及认证资料，或文字、公开的视频等发送、回复或自动回复消息和相关链接页面，以及其他使用帐号或本服务所产生的内容。
        </view>
          <view>
            (2)&nbsp;用户不得利用“HiDancing”帐号或本服务截取、制作、发布、传播如下法律、法规和政策禁止的内容：
  反对宪法所确定的基本原则的；
  危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
  损害国家荣誉和利益的；
  煽动民族仇恨、民族歧视，破坏民族团结的；
  破坏国家宗教政策，宣扬邪教和封建迷信的；
  散布谣言，扰乱社会秩序，破坏社会稳定的；
  散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
  侮辱或者诽谤他人，侵害他人合法权益的；
  不遵守法律法规底线、社会主义制度底线、国家利益底线、公民合法权益底线、社会公共秩序底线、道德风尚底线和信息真实性底线的“七条底线”要求的；
  含有法律、行政法规禁止的其他内容的信息。
          </view>
          <view>
            (3)&nbsp;用户不得利用“HiDancing”帐号或本服务制作、上载、复制、发布、传播如下干扰“HiDancing”正常运营，以及侵犯其他用户或第三方合法权益的内容：
  含有任何性或性暗示的；
  含有辱骂、恐吓、威胁内容的；
  遵守相关政府机关的要求；
  含有骚扰、垃圾广告、恶意信息、诱骗信息的；
  涉及他人隐私、个人信息或资料的；
  侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；
  含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益内容的信息。
  </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(5)"
      >
        5.&nbsp;使用规则
      </view>
      <view
        v-show="textStatus[5]"
        class="fon28 indent line-heichi40 marginy20"
      >
       <view >
         (1)&nbsp;用户在本服务中或通过本服务所传送、发布的任何内容并不反映或代表，也不得被视为反映或代表深赛科技的观点、立场或政策，深赛科技对此不承担任何责任。
       </view>
        <view >
          (2)&nbsp;用户不得利用“HiDancing”帐号或本服务进行如下行为：
  提交、发布虚假信息，或盗用他人头像或资料，冒充、利用他人名义的；
  强制、诱导其他用户关注、点击链接页面或分享信息的；
  虚构事实、隐瞒真相以误导、欺骗他人的；
  利用技术手段批量建立虚假帐号的；
  利用“HiDancing”帐号或本服务从事任何违法犯罪活动的；
  制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；
  其他违反法律法规规定、侵犯其他用户合法权益、干扰“HiDancing”正常运营或深赛科技未明示授权的行为。
        </view>
        <view >
          (3)&nbsp;用户须对利用“HiDancing”帐号或本服务传送信息的真实性、合法性、无害性、准确性、有效性等全权负责，与用户所传播的信息相关的任何法律责任由用户自行承担，与深赛科技无关。如因此给深赛科技或第三方造成损害的，用户应当依法予以赔偿。
        </view>
        <view >
          (4)&nbsp;深赛科技提供的服务中可能包括广告，用户同意在使用过程中显示深赛科技和第三方供应商、合作伙伴提供的广告。除法律法规明确规定外，用户应自行对依该广告信息进行的交易负责，对用户因依该广告信息进行的交易或前述广告商提供的内容而遭受的损失或损害，深赛科技不承担任何责任。
        </view>
        <view >
         (5)&nbsp;除非深赛科技书面许可，用户不得从事下列任一行为：
  删除软件及其副本上关于著作权的信息；
  对软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现软件的源代码；
  对深赛科技拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等；
  对软件或者软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经深赛科技授权的第三方工具/服务接入软件和相关系统；
  通过修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论这些行为是否为商业目的；
  通过非深赛科技开发、授权的第三方软件、插件、外挂、系统，登录或使用深赛科技软件及服务，或制作、发布、传播非深赛科技开发、授权的第三方软件、插件、外挂、系统。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(6)"
      >
        6.&nbsp;虚拟货币
      </view>
      <view
        v-show="textStatus[6]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view >
          (1)&nbsp;深赛科技将在“HiDancing”平台发行虚拟货币，即高手币。高手币可用于购买“HiDancing”平台的增值服务，包括但不限于长视频截取及活动付费，除此外，不得用于其他任何用途。该等增值服务的价格均以高手币为单位，具体价格信息将由深赛科技自行决定并在相关服务页面上显示。
        </view>
        <view >
          (2)&nbsp;高手币和人民币的兑换比例以用户购买高手币相关渠道服务页面显示为准。深赛科技有权根据运营情况随时变更上述兑换比例，并将在用户购买高手币相关渠道服务页面显示。
        </view>
        <view >
          (3)&nbsp;用户默认已开通高手币账户，可进行高手币购买（下称“充值”）和消费。用户可在设置页面查询到高手币余额、购买记录和消费记录。高手币相关信息将不作为公开信息。
        </view>
        <view >
          (4)&nbsp;用户可以通过微信支付、支付宝或其他“HiDancing”平台提供的充值途径为高手币账户进行充值。用户使用高手币购买相关收费服务后，可将相关收费服务赠与其他用户。用户确认不会以非法方式或者使用非平台所指定的充值途径进行充值,如果用户违规使用非深赛科技认可的充值途径非法充值/购买高手币，则深赛科技不保证充值顺利或正确完成，若因此造成用户权益受损，深赛科技将不会作出任何补偿或赔偿，深赛科技同时保留随时终止用户HiDancing账号资格及使用各项充值服务的权利，并进行相应惩罚。
        </view>
        <view >
          (5)&nbsp;用户确认在进行充值前已经仔细确认过自己的账号并仔细选择了相关操作选项，若因用户自身输入账号错误、操作不当或不了解充值计费方式等因素造成充错账号、错选充值种类等情形而损害自身权益的，深赛科技将不会作出任何补偿或赔偿。
        </view>
        <view >
          (6)&nbsp;用户确认，高手币一经充值成功，除法律法规明确规定外，在任何情况下不能兑换为法定货币，不能转让他人。除法律法规明确规定外，高手币账户充值完成后，深赛科技不予退款。
        </view>
        <view >
          (7)&nbsp;用户确认，高手币只能用于购买“HiDancing”平台上的各类增值服务，任何情况下不得与深赛科技以外的第三方进行高手币交易，亦不得在除“HiDancing”平台以外的第三方平台（如淘宝）上进行交易；如违反前述约定，造成用户或第三方任何损失，深赛科技不负任何责任，且如深赛科技有理由怀疑用户的高手币账户或使用情况有作弊或异常状况，深赛科技将拒绝该用户使用高手币进行支付，直至按本协议约定采取相关封禁措施。
        </view>
        
        <view >
          (8)&nbsp;深赛科技有权基于交易安全等方面的考虑不时设定或修改涉及交易的相关事项，包括但不限于交易限额、交易次数等。用户了解并确认深赛科技的前述设定或修改可能对用户的交易产生一定的不便，用户对此没有异议。
        </view>
        <view >
          (9)&nbsp;用户确认，除法律法规明确规定或本协议另有约定外，用户已购买的任何收费服务不能以任何理由退购（即退换成高手币或法定货币）或调换成其他服务。
        </view>
        <view >
          (10)&nbsp;因用户自身的原因导致深赛科技无法提供高手币购买服务或提供高手币购买服务时发生任何错误而产生的任何损失或责任，由用户自行负责，深赛科技不承担责任，包括但不限于：
 因用户的HiDancing账号丢失、被封禁或冻结；
 用户将密码告知他人导致的财产损失；
 因用户绑定的第三方支付机构账户的原因导致的任何损失或责任；
 其他用户故意或者重大过失或者违反法律法规导致的财产损失。
        </view>
        <view >
          (11)&nbsp;用户在使用深赛科技提供的服务时，如出现违反国家法律法规、本协议约定或其他本平台对用户的管理规定的情形，深赛科技有权暂时或永久封禁用户的账号。账号封禁后至解禁（如有）前，用户账户上的剩余高手币将被暂时冻结或全部扣除，不可继续用于购买平台上的虚拟产品或服务，同时不予返还用户购买高手币时的现金价值。
        </view>
        <view >
          (12)&nbsp;用户确认并同意如用户主动注销账号，则用户已充值到账的高手币，购买的虚拟礼物，游戏币以及会员权益等视为自动放弃，深赛科技不予返还相应的现金价值，也不会作出任何补偿。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(7)"
      >
        7.&nbsp;账户管理
      </view>

      <view
        v-show="textStatus[7]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          “HiDancing”帐号的所有权归深赛科技所有，用户完成申请注册手续后，获得“HiDancing”帐号的使用权，该使用权仅属于初始申请注册人，禁止赠与、借用、租用、转让或售卖。深赛科技因经营需要，有权回收用户的“HiDancing”帐号
        </view>
        <view>
          用户可以通过1）查看与编辑个人资料页，2）“设置”页面里的“安全设置”页面来查询、更改、删除、注销“HiDancing”帐户上的个人资料、注册信息及传送内容等，但需注意，删除有关信息的同时也会删除用户储存在系统中的文字和图片。用户需承担该风险。
        </view>
        <view>
          用户有责任妥善保管注册帐号信息及帐号密码的安全，因用户保管不善可能导致遭受盗号或密码失窃，责任由用户自行承担。用户需要对注册帐号以及密码下的行为承担法律责任。用户同意在任何情况下不使用其他用户的帐号或密码。在用户怀疑他人使用其帐号或密码时，用户同意立即通知深赛科技。
        </view>
        <view class="fon28 indent line-heichi40">
          用户应遵守本协议的各项条款，正确、适当地使用本服务，如因用户违反本协议中的任何条款，深赛科技在通知用户后有权依据协议中断或终止对违约用户“HiDancing”帐号提供服务。同时，深赛科技保留在任何时候收回“HiDancing”帐号、用户名的权利。
        </view>
        <view>
          用户可以通过“设置”页面里的“安全设置”页面来进行账号注销服务，用户确认注销账号是不可恢复的操作，用户应自行备份与HiDancing账号相关的信息和数据，用户确认操作之前与HiDancing账号相关的所有服务均已进行妥善处理。用户确认并同意注销账号后并不代表本HiDancing账号注销前的账号行为和相关责任得到豁免或减轻，如在注销期间，用户的账号被他人投诉、被国家机关调查或者正处于诉讼、仲裁程序中，深赛科技有限自行终止用户的账号注销并无需另行得到用户的同意。
         </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(8)"
      >
        8.&nbsp;数据存储
      </view>
      <view
        v-show="textStatus[8]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view class="fonweight">
          深赛科技不对用户在本服务中相关数据的删除或储存失败负责。
        </view>
        <view>
          深赛科技可以根据实际情况自行决定用户在本服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。用户可根据自己的需要自行备份本服务中的相关数据。
        </view>
        <view class="fonweight">
          如用户停止使用本服务或本服务终止，深赛科技可以从服务器上永久地删除用户的数据。本服务停止、终止后，深赛科技没有义务向用户返还任何数据。
        </view>
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
        <view>
          用户理解并同意，“HiDancing”仅为用户提供公共视频浏览、截取及分享的平台，用户必须为自己注册帐号下的一切行为负责，包括用户所传送的任何内容以及由此产生的任何后果。用户应对“HiDancing”及本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。深赛科技无法且不会对因用户行为而导致的任何损失或损害承担责任。
          如果用户发现任何人违反本协议约定或以其他不当的方式使用本服务，请立即向深赛科技举报或投诉，举报或投诉电话为15727322620，深赛科技将依本协议约定进行处理。
        </view>
        <view class="fon28 indent">
          用户理解并同意，因业务发展需要，深赛科技保留单方面对本服务的全部或部分服务内容变更、暂停、终止或撤销的权利，用户需承担此风险。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(10)"
      >
        10.&nbsp;知识产权声明
      </view>
      <view
        v-show="textStatus[10]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          除本服务中涉及广告的知识产权由相应广告商享有外，深赛科技在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权均归深赛科技所有，但用户在使用本服务前对自己发布的内容已合法取得知识产权的除外。
        </view>
        <view>
          除另有特别声明外，深赛科技提供本服务时所依托软件的著作权、专利权及其他知识产权均归深赛科技所有。
        </view>
        <view>
          深赛科技在本服务中所涉及的图形、文字或其组成，以及其他深赛科技标志及产品、服务名称（以下统称“深赛科技标识”），其著作权或商标权归深赛科技所有。未经深赛科技事先书面同意，用户不得将深赛科技标识以任何方式展示或使用或作其他处理，也不得向他人表明用户有权展示、使用、或其他有权处理深赛科技标识的行为。
        </view>
        <view>
          上述及其他任何深赛科技或相关广告商依法拥有的知识产权均受到法律保护，未经深赛科技或相关广告商书面许可，用户不得以任何形式进行使用或创造相关衍生作品。
        </view>
        <view>
          用户在使用HiDancing服务时发表上传的文字、图片、视频、音频等信息，此部分信息的知识产权归用户，责任由用户承担。但用户的公开截取视频、发表、上传行为视为对深赛科技的授权，用户理解并同意授予深赛科技及其关联公司全球范围内完全免费、不可撤销、独家、永久、可转授权和可再许可的权利，包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及《著作权法》规定的由著作权人享有的其他著作财产权利及邻接权利。深赛科技可自行选择是否使用以及使用方式，包括但不限于将前述信息在深赛科技旗下的服务平台上使用与传播，将上述信息再次编辑后使用，以及由深赛科技授权给合作方使用、编辑与传播等。
        </view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(11)"
      >
        11.&nbsp;法律责任
      </view>
      <view
        v-show="textStatus[11]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          如果深赛科技发现或收到他人举报或投诉用户违反本协议约定的，深赛科技有权不经通知随时对相关内容，包括但不限于用户资料、评论进行审查、删除，并视情节轻重对违规帐号处以包括但不限于警告、帐号封禁 、设备封禁 、功能封禁 的处罚，且通知用户处理结果。
        </view>
        <view>用户理解并同意，深赛科技有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。</view>
        <view>用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户应当赔偿深赛科技与合作公司、关联公司，并使之免受损害。</view>
      </view>
      <view
        class="marginbottom20"
        @tap="changeStatus(12)"
      >
        12.&nbsp;不可抗力及其他免责事由
      </view>
      <view
        v-show="textStatus[12]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户应当赔偿深赛科技与合作公司、关联公司，并使之免受损害。
          
        </view>
        <view>
          本服务同大多数互联网服务一样，受包括但不限于用户原因、网络服务质量、社会环境等因素的差异影响，可能受到各种安全问题的侵扰，如他人利用用户的资料、视频，造成现实生活中的骚扰；用户下载安装的其它软件或访问的其他网站中含有“特洛伊木马”等病毒，威胁到用户的计算机信息和数据的安全，继而影响本服务的正常使用等等。用户应加强信息安全及使用者资料的保护意识，要注意加强密码保护，以免遭致损失和骚扰。
        </view>
        <view>
          用户理解并确认，本服务存在因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险，因此导致的用户或第三方任何损失，深赛科技不承担任何责任。
        </view>
        <view>
          用户理解并确认，在使用本服务过程中存在来自任何他人的包括误导性的、欺骗性的、威胁性的、诽谤性的、令人反感的或非法的信息，或侵犯他人权利的匿名或冒名的信息，以及伴随该等信息的行为，因此导致的用户或第三方的任何损失，深赛科技不承担任何责任。
        </view>
        <view>
          用户理解并确认，深赛科技需要定期或不定期地对“HiDancing”平台或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，深赛科技无需为此承担任何责任，但深赛科技应事先进行通告。
        </view>
        <view>
          深赛科技依据法律法规、本协议约定获得处理违法违规或违约内容的权利，该权利不构成深赛科技的义务或承诺，深赛科技不能保证及时发现违法违规或违约行为或进行相应处理。
        </view>
        <view>
          用户理解并确认，对于深赛科技向用户提供的下列产品或者服务的质量缺陷及其引发的任何损失，深赛科技无需承担任何责任：
           深赛科技向用户免费提供的服务；
          深赛科技向用户赠送的任何产品或者服务。
        </view>
        <view>
          在任何情况下，深赛科技均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，包括因用户使用“HiDancing”或本服务而遭受的利润损失，承担责任（即使深赛科技已被告知该等损失的可能性亦然）。尽管本协议中可能含有相悖的规定，深赛科技对用户承担的全部责任，无论因何原因或何种行为方式，始终不超过用户因使用深赛科技提供的服务而支付给深赛科技的费用(如有)。
        </view>
      </view>
      
      
      <view
        class="marginbottom20"
        @tap="changeStatus(13)"
      >
        13.&nbsp;服务的变更、中断、终止
      </view>
      <view
        v-show="textStatus[13]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          鉴于网络服务的特殊性，用户同意深赛科技有权随时变更、中断或终止部分或全部的服务（包括收费服务）。深赛科技变更、中断或终止的服务，深赛科技应当在变更、中断或终止之前通知用户，并应向受影响的用户提供等值的替代性的服务；如用户不愿意接受替代性的服务，如果该用户已经向深赛科技支付的高手币，深赛科技应当按照该用户实际使用服务的情况扣除相应高手币之后将剩余的高手币退还用户的高手币账户中。
        </view>
        <view>如发生下列任何一种情形，深赛科技有权变更、中断或终止向用户提供的免费服务或收费服务，而无需对用户或任何第三方承担任何责任：
 根据法律规定用户应提交真实信息，而用户提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；
 用户违反相关法律法规或本协议的约定；
 按照法律规定或有权机关的要求；
 出于安全的原因或其他必要的情形。</view>
      </view>
      
      <view
        class="marginbottom20"
        @tap="changeStatus(14)"
      >
        14.&nbsp;其他
      </view>
      <view
        v-show="textStatus[14]"
        class="fon28 indent line-heichi40 marginy20"
      >
        <view>
          深赛科技郑重提醒用户注意本协议中免除深赛科技责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险。
        </view>
        <view>本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若用户和深赛科技之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交深赛科技住所地有管辖权的人民法院管辖。</view>
        <view>
          本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。
        </view>
        <view>
          由于互联网高速发展，您与深赛科技签署的本协议列明的条款可能并不能完整罗列并覆盖您与HiDancing所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，HiCourt隐私政策等均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用HiDancing平台服务，视为您同意上述补充协议。
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
        textStatus:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
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