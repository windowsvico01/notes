import index from './index.art';
import Swiper from 'swiper';
import './index.css';
import '../../../utils/swiper/swiper.min.css';
class Banner {
    constructor(dom) {
        this.config = {
            dom,
        }
    }
    init(params) {
      const { modData = {} } = params;
      console.log(params)
      this.getArticle({article_id: modData.articleId}, (res, err) => {
        const tHtml = index(res);
        this.config.dom.html(tHtml);
        this.afterInit();
      })
    }
    afterInit() {
        this.initSwiper()
    }
    initSwiper() {
        const mySwiper = new Swiper ('.swiper-container', {
            // direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,//可选选项，自动滑动
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // // 如果需要前进后退按钮
            // navigation: {
            //   nextEl: '.swiper-button-next',
            //   prevEl: '.swiper-button-prev',
            // },
            
            // // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          })
    }
    getArticle(params, cb) {
      $.post('/content/getDraftList', params, (res,err) => {
        cb(res.data);
      })
    }
}
export default Banner;