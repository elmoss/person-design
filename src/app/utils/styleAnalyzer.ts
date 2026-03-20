// Mock AI style analysis - simulates analyzing user photos
// In production, this would connect to a real AI service

const styleProfiles = [
  {
    mainStyle: '优雅知性',
    description: '您散发着优雅大方的气质，适合简约而精致的穿搭风格。注重品质感和细节，追求经典永恒的美感。',
    traits: ['简约大方', '精致优雅', '知性气质', '低调奢华'],
    colorPalette: ['#2C3E50', '#ECF0F1', '#BDC3C7', '#34495E', '#95A5A6'],
    recommendations: [
      {
        title: '日常通勤',
        items: [
          '剪裁合身的西装外套',
          '高质感的衬衫或针织衫',
          '经典款A字裙或直筒裤',
          '简约款小方包'
        ],
        image: 'https://images.unsplash.com/photo-1745284504844-7979176dc29b?w=400'
      },
      {
        title: '商务场合',
        items: [
          '套装或职业连衣裙',
          '经典款高跟鞋',
          '简约款手表或珍珠耳饰',
          '质感公文包'
        ],
        image: 'https://images.unsplash.com/photo-1643155571345-1b36e8b01559?w=400'
      },
      {
        title: '休闲周末',
        items: [
          '羊绒开衫或针织衫',
          '优质牛仔裤或休闲裤',
          '舒适平底鞋或乐福鞋',
          '帆布托特包'
        ],
        image: 'https://images.unsplash.com/photo-1765560216839-a7d945dd6a4b?w=400'
      }
    ],
    tips: [
      '选择中性色系作为基础色，如黑、白、灰、米色、藏蓝等，易于搭配且百搭',
      '投资几件高质量的基础款单品，如经典款风衣、羊绒大衣、白衬衫等',
      '配饰选择简约精致的款式，避免过于夸张的设计',
      '注意服装的版型和剪裁，合身的衣服能更好地展现优雅气质'
    ]
  },
  {
    mainStyle: '休闲活力',
    description: '您拥有青春活力的气质，适合舒适自在的休闲风格。喜欢运动感和街头时尚的元素，追求个性与自由。',
    traits: ['活力四射', '运动风尚', '街头时尚', '青春洋溢'],
    colorPalette: ['#E74C3C', '#3498DB', '#F39C12', '#2ECC71', '#9B59B6'],
    recommendations: [
      {
        title: '日常出行',
        items: [
          '舒适的卫衣或T恤',
          '牛仔裤或运动裤',
          '运动鞋或帆布鞋',
          '双肩包或斜挎包'
        ],
        image: 'https://images.unsplash.com/photo-1765560216839-a7d945dd6a4b?w=400'
      },
      {
        title: '运动健身',
        items: [
          '速干运动上衣',
          '弹力运动裤或短裤',
          '专业运动鞋',
          '运动腰包或臂包'
        ],
        image: 'https://images.unsplash.com/photo-1643155571345-1b36e8b01559?w=400'
      },
      {
        title: '街头潮流',
        items: [
          'oversize卫衣或夹克',
          '阔腿裤或工装裤',
          '潮流球鞋',
          '棒球帽或渔夫帽'
        ],
        image: 'https://images.unsplash.com/photo-1745284504844-7979176dc29b?w=400'
      }
    ],
    tips: [
      '大胆尝试撞色搭配，让穿搭更有活力和个性',
      '运动单品也可以日常穿着，打造athleisure风格',
      '配饰可以选择帽子、腰包等增加街头感',
      '注意上下身的宽松比例，避免整体过于臃肿'
    ]
  },
  {
    mainStyle: '温柔浪漫',
    description: '您散发着温柔甜美的气息，适合柔和浪漫的穿搭风格。偏爱轻柔的面料和柔美的线条，追求优雅feminine的气质。',
    traits: ['温柔甜美', '浪漫优雅', '轻柔飘逸', '少女气息'],
    colorPalette: ['#FFC0CB', '#E8D5C4', '#C9A0DC', '#B4E7CE', '#FFE5E5'],
    recommendations: [
      {
        title: '约会装扮',
        items: [
          '雪纺或蕾丝连衣裙',
          '温柔色系的针织开衫',
          '细跟凉鞋或玛丽珍鞋',
          '小巧的链条包'
        ],
        image: 'https://images.unsplash.com/photo-1764683547385-0083b04c816f?w=400'
      },
      {
        title: '日常穿搭',
        items: [
          '柔软的针织衫',
          '高腰A字裙或百褶裙',
          '芭蕾平底鞋',
          '编织包或布艺包'
        ],
        image: 'https://images.unsplash.com/photo-1643155571345-1b36e8b01559?w=400'
      },
      {
        title: '特殊场合',
        items: [
          '轻奢小礼服',
          '蕾丝或薄纱元素',
          '精致高跟鞋',
          '珍珠或花朵配饰'
        ],
        image: 'https://images.unsplash.com/photo-1745284504844-7979176dc29b?w=400'
      }
    ],
    tips: [
      '多使用粉色、米色、淡紫等温柔色系，营造柔美氛围',
      '选择有蕾丝、蝴蝶结、花边等细节的单品增加浪漫感',
      '面料以轻柔飘逸为主，如雪纺、真丝、针织等',
      '配饰可以选择珍珠、花朵等元素，提升整体的feminine气质'
    ]
  },
  {
    mainStyle: '个性时髦',
    description: '您拥有独特的时尚品味，适合大胆前卫的个性穿搭。敢于尝试新潮流，喜欢用服装表达自我态度。',
    traits: ['个性独特', '时髦前卫', '大胆创新', '潮流先锋'],
    colorPalette: ['#000000', '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'],
    recommendations: [
      {
        title: '街拍造型',
        items: [
          '设计感外套或夹克',
          '不对称或解构单品',
          '个性配饰如墨镜、项链',
          '特色包包或腰包'
        ],
        image: 'https://images.unsplash.com/photo-1643155571345-1b36e8b01559?w=400'
      },
      {
        title: '派对夜店',
        items: [
          '亮片或金属元素单品',
          '修身裤装或短裙',
          '高跟或厚底鞋',
          '夸张耳环或choker'
        ],
        image: 'https://images.unsplash.com/photo-1765560216839-a7d945dd6a4b?w=400'
      },
      {
        title: '日常潮搭',
        items: [
          '印花T恤或衬衫',
          '破洞牛仔或皮裤',
          '马丁靴或厚底鞋',
          '链条包或腰包'
        ],
        image: 'https://images.unsplash.com/photo-1745284504844-7979176dc29b?w=400'
      }
    ],
    tips: [
      '不要害怕尝试对比强烈的配色，黑白配色永不过时',
      '叠穿是展现层次感的好方法，但要注意整体协调',
      '选择一两件statement单品作为重点，避免过于繁杂',
      '配饰是画龙点睛之笔，可以选择夸张或设计感强的款式'
    ]
  }
];

export function analyzeStyle(): Promise<typeof styleProfiles[0]> {
  return new Promise((resolve) => {
    // Simulate AI processing time
    setTimeout(() => {
      // Randomly select a style profile (in production, this would be based on actual AI analysis)
      const randomIndex = Math.floor(Math.random() * styleProfiles.length);
      resolve(styleProfiles[randomIndex]);
    }, 3000); // 3 second delay to simulate processing
  });
}
