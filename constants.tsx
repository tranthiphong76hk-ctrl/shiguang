import React from 'react';
import { CaseStudy, ServiceItem, Testimonial, TeamMember, Milestone, Honor, ProcessStep } from './types';
import { Compass, BookOpen, Heart, Shield, Award, Users, Lightbulb, TrendingUp } from 'lucide-react';

// Provincial Cases (浙江省内)
export const PROVINCIAL_CASES: CaseStudy[] = [
  {
    id: 'p1',
    title: 'AI+Youth 杭州科创营',
    category: 'provincial',
    image: 'https://picsum.photos/800/600?random=1',
    highlights: ['浙大专家授课', 'AI底层原理', '申昊科技'],
    description: '由浙江省人工智能学会主办，面向9-15岁中小学生。深入浙大实验室，探访阿里、申昊科技等名企，完成AI项目路演。',
    link: 'https://mp.weixin.qq.com/s/vjm_0SCjNwbFCdlJH1NBuw'
  },
  {
    id: 'p2',
    title: '宋韵浸润 科技探索',
    category: 'provincial',
    image: 'https://picsum.photos/800/600?random=2',
    highlights: ['江南文脉', '非遗体验', 'AI+传统文化'],
    description: '融合江南文学、历史与现代科技。漫步西湖、岳王庙，体验点茶，探讨AI与传统文化的碰撞融合。',
    link: 'https://mp.weixin.qq.com/s/Qh_XcFySPfbJiNxhtSeOhg?scene=1'
  },
  {
    id: 'p3',
    title: '大龙小龙闹双龙',
    category: 'provincial',
    image: 'https://picsum.photos/800/600?random=3',
    highlights: ['地质科考', '喀斯特地貌', '水电站探秘'],
    description: '金华双龙洞深度研学，结合自然探秘与人文传承。参观全国首座高水头水电站，探究喀斯特地貌成因。',
    link: 'https://mp.weixin.qq.com/s/nWNUEIwukH0XQCGtJ9FAGw'
  },
  {
    id: 'p4',
    title: '舟行致远 海上丝绸之路',
    category: 'provincial',
    image: 'https://picsum.photos/800/600?random=4',
    highlights: ['海洋文化', '古港探秘', '商贸历史'],
    description: '追溯海上丝绸之路的历史足迹，了解古代商贸繁荣，体验海洋文化的博大精深与现代航运的发展。',
    link: 'https://mp.weixin.qq.com/s/39a_qvAhVZgSdDaDF8e2OA'
  },
  {
    id: 'p5',
    title: '江南文脉 诗画浙江',
    category: 'provincial',
    image: 'https://picsum.photos/800/600?random=5',
    highlights: ['诗路文化', '水乡风情', '文学创作'],
    description: '行走在诗画江南，从书本走向实地，感受浙江的山水之美与深厚的人文底蕴，激发文学创作灵感。',
    link: 'https://mp.weixin.qq.com/s/1Oi1jZ8_fnWWTXUNiw5t3Q'
  },
  {
    id: 'p6',
    title: '改革开放看温州',
    category: 'provincial',
    image: 'https://picsum.photos/800/600?random=6',
    highlights: ['温州模式', '商业思维', '创新精神'],
    description: '探寻温州人“敢为天下先”的创业精神，了解改革开放历程，培养青少年的商业思维与创新意识。',
    link: 'https://mp.weixin.qq.com/s/MRYTBvLpbGOUmxzoCydFqw'
  },
  {
    id: 'p7',
    title: '东南形胜 诗画吴越',
    category: 'provincial',
    image: 'https://picsum.photos/800/600?random=7',
    highlights: ['吴越文化', '钱王家训', '历史古迹'],
    description: '钱王带我走吴越，深入了解吴越国的历史贡献与文化遗产，领略东南形胜的壮丽景色。',
    link: 'https://mp.weixin.qq.com/s/9Q-ENDRG_glmeEtVFdTWaw'
  },
  {
    id: 'p8',
    title: '在湖州看见美丽中国',
    category: 'provincial',
    image: 'https://picsum.photos/800/600?random=8',
    highlights: ['两山理论', '生态文明', '美丽乡村'],
    description: '走进“两山”理论发源地，实地考察生态文明建设成果，感受绿色发展带来的乡村振兴。',
    link: 'https://mp.weixin.qq.com/s/hoNbeHIXEvYVMKdUEDjZZw?scene=1'
  }
];

// National Cases (省外/全国)
export const NATIONAL_CASES: CaseStudy[] = [
  {
    id: 'n1',
    title: '走进古都西安',
    category: 'national',
    image: 'https://picsum.photos/800/600?random=9',
    highlights: ['历史脉搏', '秦兵马俑', '大唐不夜城'],
    description: '触摸历史脉搏，感受千年古都的文化底蕴。深度解析中华文明的起源与发展。',
    link: 'https://mp.weixin.qq.com/s/lpL71h72w0317fSfqVRU5Q'
  },
  {
    id: 'n2',
    title: '走进长沙 探寻湖湘',
    category: 'national',
    image: 'https://picsum.photos/800/600?random=10',
    highlights: ['红色之城', '岳麓书院', '橘子洲头'],
    description: '探寻湖湘文化之源，感悟“敢为人先”的精神。体验湖南卫视传媒文化与红色革命历史。',
    link: 'https://mp.weixin.qq.com/s/cFiH_bLSy9es9p79Sf73gQ'
  },
  {
    id: 'n3',
    title: '京华文脉 启智清北',
    category: 'national',
    image: 'https://picsum.photos/800/600?random=11',
    highlights: ['名校交流', '故宫研学', '科技强国'],
    description: '走进清华北大，树立远大志向。探索国家博物馆，领略大国重器，感受首都的文化自信。',
    link: 'https://mp.weixin.qq.com/s/T9ugfI1vEWGtTNQJJc1j6w'
  },
  {
    id: 'n4',
    title: '爱拼闽南劲 千年海丝情',
    category: 'national',
    image: 'https://picsum.photos/800/600?random=12',
    highlights: ['闽南文化', '土楼探秘', '海丝起点'],
    description: '深入福建，体验闽南独特的建筑与民俗文化，探访世界文化遗产福建土楼。',
    link: 'https://mp.weixin.qq.com/s/8WPywxTh6ZpMfPpO8GfRow'
  },
  {
    id: 'n5',
    title: '解码赣鄱文化',
    category: 'national',
    image: 'https://picsum.photos/800/600?random=13',
    highlights: ['江西风景独好', '瓷都景德镇', '红色摇篮'],
    description: '探索江西丰富的自然与人文资源，从景德镇的陶瓷文化到井冈山的红色精神。',
    link: 'https://mp.weixin.qq.com/s/i7RXGOTtJlZNb4zbKG7hgQ'
  },
  {
    id: 'n6',
    title: '溯江南之源 觅金陵之魂',
    category: 'national',
    image: 'https://picsum.photos/800/600?random=14',
    highlights: ['六朝古都', '南京大屠杀纪念馆', '中山陵'],
    description: '走进南京，感受六朝古都的沧桑与辉煌，进行深刻的爱国主义教育与历史文化考察。',
    link: 'https://mp.weixin.qq.com/s/Kz1coqkRplwFzQ2Q3kuXeA'
  },
  {
    id: 'n7',
    title: '草原丝路 文明探源',
    category: 'national',
    image: 'https://picsum.photos/800/600?random=15',
    highlights: ['内蒙古科考', '沙漠生态', '蒙元文化'],
    description: '深入内蒙古大草原与库布齐沙漠，考察生态环境变迁，体验马背民族的豪情。',
    link: 'https://mp.weixin.qq.com/s/3V0jJA9wMr5ggdHzlhXgng'
  }
];

// Core Services
export const SERVICES: ServiceItem[] = [
  {
    icon: <Lightbulb className="w-8 h-8 text-shiyuan-gold" />,
    title: '课程研发中心',
    description: '根据学校学制与科学课程标准，定制PBL项目式研学课程。涵盖科考探索、学科研学、非遗文化等。'
  },
  {
    icon: <Compass className="w-8 h-8 text-shiyuan-gold" />,
    title: '营地基地运营',
    description: '拥有西溪且留下、水上运动中心等独家基地。提供流程化、标准化的营地运营咨询与产品开发。'
  },
  {
    icon: <Shield className="w-8 h-8 text-shiyuan-gold" />,
    title: '研学旅行服务',
    description: '严选食宿行，配备高级导师与医护。全流程安全保障，用心服务每一位客户，追求品质卓越。'
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-shiyuan-gold" />,
    title: '咨询与规划',
    description: '为政府、学校及企业提供研学旅行整体解决方案，包括区域研学课程规划与基地建设咨询。'
  }
];

// Service Process
export const SERVICE_PROCESS: ProcessStep[] = [
  {
    number: "01",
    title: "需求调研",
    description: "深入沟通学校/机构育人目标，分析学生学段特征与研学需求。"
  },
  {
    number: "02",
    title: "方案定制",
    description: "研发团队设计专属PBL课程与行程，匹配独家基地与专家资源。"
  },
  {
    number: "03",
    title: "精细执行",
    description: "标准化接待流程，专业导师带队，全天候安全监控与后勤保障。"
  },
  {
    number: "04",
    title: "成果反馈",
    description: "研学手册记录，活动影像留存，满意度调研与课程优化迭代。"
  }
];

// Service Stats
export const SERVICE_STATS = [
  { label: "成立年份", value: "2016" },
  { label: "独家基地", value: "4+" },
  { label: "合作学校", value: "100+" },
  { label: "服务人次", value: "10W+" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: '张校长',
    role: '杭州某知名民办小学校长',
    avatar: 'https://picsum.photos/100/100?random=20',
    content: '诗远研学的课程设计非常有深度，不是走马观花，而是真正做到了“研”与“学”的结合。孩子们回来后眼界开阔了很多。'
  },
  {
    id: 't2',
    name: '李女士',
    role: '学生家长代表',
    avatar: 'https://picsum.photos/100/100?random=21',
    content: '参加了AI夏令营，孩子对编程产生了浓厚兴趣。老师非常负责，每天的反馈都很及时，作为家长我们很放心。'
  }
];

// Company Information
export const COMPANY_INFO = {
  intro: "诗远研学成立于2016年，是一家从事科考探索、学科研学、研学基地营地开发运营咨询的专业机构。公司团队分为课程研发中心、营地基地运营中心、研学旅行服务中心。管理层聚集了营地基地运营专家、蒙台梭利教育专家、研学旅行专家、高级导师等。我们采用流程化、标准化、规范化、制度化以及系统化的管理模式。",
  culture: {
    values: ["教育为本", "客户第一", "诚实守信", "专注专业", "创新共享"],
    vision: "让每个孩子拥有诗和远方",
    mission: "让每一位孩子在研学中获得知识和力量，做最好的自己",
    philosophy: "用心服务好每一位客户，专注于做好教育，追求品质卓越的客户体验"
  },
  milestones: [
    { year: "2016", title: "公司成立", description: "《溯源钱塘》研学旅行被评为“全国研学优秀成果”。" },
    { year: "2017", title: "深耕本土", description: "钱塘江母亲河研学全面推广及执行。" },
    { year: "2019", title: "出版著作", description: "联合出版国内第一本研学专业书籍《解码研学旅行》。" },
    { year: "2021", title: "科技产品", description: "海洋科考探索、未来已来科技研学产品上线。" },
    { year: "2022", title: "标准制定", description: "出版《研学实践教育营地（基地）建设理论与实务》。" },
    { year: "2024", title: "五育同行", description: "联合浙江省青少年体育运动联合会开发“跃动成长”项目。" },
    { year: "2025", title: "宋式美学", description: "联合留下1129生活街区，打造宋式美学研学课程体系。" }
  ] as Milestone[],
  team: [
    { name: "鲁老师", role: "资深研学专家", description: "曾服务国内外多家旅行社、联合出版浙江首部研学书籍。" },
    { name: "毛老师", role: "研学教育专家", description: "浙江省教育厅研学专家，浙大讲师，《研学实践教育营地》专著作者。" },
    { name: "孙老师", role: "课程研发总监", description: "《解码研学旅行》专著作者，组织“溯源钱塘”研学旅行。" },
    { name: "王老师", role: "STEM教育专家", description: "主编《STEM项目式学习科创教育教学标准》全国团体标准。" },
    { name: "卢博士", role: "科学顾问", description: "中国科学技术大学博士，参与编辑《十万个为什么》第六版。" }
  ] as TeamMember[],
  honors: [
    { id: "h1", title: "出版国内第一本基地营地专业书籍" },
    { id: "h2", title: "发布《自然教育课程研发与产品设计标准》" },
    { id: "h3", title: "发布《STEM项目式科创教育教学标准》" },
    { id: "h4", title: "“溯源钱塘”获全国研学优秀成果" },
    { id: "h5", title: "2024年度全国青少年协会研学实践活动优质路线" }
  ] as Honor[]
};