const CATALOG_PER_ROW = 5;
const BUNDLE_PER_ROW = 3;

// const serviceEndpoint = 'mock-data/blog-service.json';
// const serviceEndpoint = 'mock-data/cicd-service.json';
const baseUrl = 'http://orch.kubelink.borathon.photon-infra.com';
const serviceEndpoint = baseUrl + '/catalog/bundles';

let row = 0;
let config = {};

const bundle = {
  injectDiagram(data) {
    const bundle = {
      id: data.id || 'bundle-id',
      imgSrc: data.imageSrc || 'img/kubernetes/bundle-blog',
      name: data.name || 'Kubelink bundle',
    };

    $('div.slider-area').append('\
      <img src="' + bundle.imgSrc + '.png" alt="" title="#bundle-blog"> \
      </div>\
      <div id="bundle-blog">\
        <div class="slide_all_1"> \
          <h1>' + bundle.name + '</h1>  \
          <div class="slider-btn">\
						<a href="#bundle-deploy" id="' + bundle.id + '">Deploy</a>\
					</div>   \
        </div>      \
      </div>\
    ');
  },

  injectTitle: {
    service(name) {
      $('div.new-product-area.standalone div.container').append(' \
        <div class="row"> \
					<div class="col-lg-12"> \
						<div class="section-title"> \
							<h2>' + name + ' service</h2> \
						</div> \
					</div> \
				</div> \
      ');
    },
  },

  injectRow(count, type) {
    console.log(type)
    $('div.new-product-area.standalone div.container').append(' \
      <div class="row row-' + count + ' ' + type + '"> \
        <div class="product-carousel-active"> \
        </div> \
      </div> \
    ');
  },

  injectService(count, data, type) {
    const service = {
      id: data.id || 'default-id',
      name: data.name || 'Kubelink',
      imageSrc: (data.imageSrc || 'img/kubernetes/k8s'),
    };

    let submitLink = '#kubelink-bundle';

    $('.' + type + '.row-' + count + ' div.product-carousel-active').append(' \
      <div class="col-lg-12"> \
        <div class="single-new-product ' + service.id + '" > \
          <div class="product-img"> \
            <a href="' + submitLink + '" class="' + type + '"id="' + service.id + '"> \
              <img src="' + service.imageSrc + '-1.png" class="first_img" alt="" /> \
              <img src="' + service.imageSrc + '-2.png" class="seceond_img" alt="" /> \
            </a> \
            <div class="new-product-action"> \
              <a href="#"><span class="lnr"></span>Add</a> \
            </div> \
          </div> \
          <div class="product-content text-center"> \
            <a href="' + submitLink + '" class="' + type + '" id="' + service.id + '"><h3>' + service.name + '</h3></a> \
          </div> \
        </div> \
      </div> \
    ');
  },

  selectService(id) {
    $('div.single-new-product.' + id).append(' \
      <span class="new ' + id + '">Selected</span> \
    ');
  },

  unselectService(id) {
    $('span.new.' + id).remove();
  },

  populateBundle() {
    return new Promise((resolve, reject) => {
      const bundleID = window.location.href.match(/id=([^&]+)/)[1];
      console.log(bundleID);
      $.getJSON(serviceEndpoint + '/' + bundleID, (res) => {
        console.log(res.data);
        console.log(res.data.components);
        this.injectDiagram(res.data);
        res.data.components.forEach((data, i) => {
          console.log(data);
          for (let k in data) {
            row = 0;
            this.injectTitle.service(k);
            config[k] = "";

            data[k].forEach((d, i) => {
              if ((Math.floor(i / CATALOG_PER_ROW)) === row) {
                this.injectRow(row, k);
                row++;
              }
              this.injectService(row-1, d, k);
            })
          }

          if (i === res.data.components.length - 1) {
                console.log(config);
                initEventHandler();
                resolve(true);
              }
          
        })
        // for (let k in res.data.components) {
        //   row = 0;
        //   this.injectTitle.service(k);
        //   config[k] = "";

        //   res.data[k].forEach((d, i) => {
        //     if ((Math.floor(i / CATALOG_PER_ROW)) === row) {
        //       this.injectRow(row, k);
        //       row++;
        //     }
        //     this.injectService(row-1, d, k);

        //     if (i === res.data[k].length - 1) {
        //       console.log(config);
        //       initEventHandler();
        //       resolve(true);
        //     }
        //   })
        // }
      });
    });
  },
}

let clicked = false;

const initEventHandler = () => {
    let timer;

    $('a[href="#kubelink-bundle"]').click(function() {
    const serviceID = $(this).attr('id');
    const serviceType = $(this).attr('class');

    if (config[serviceType] !== "") {
      bundle.unselectService(config[serviceType]);
    }
    
    config[serviceType] = serviceID;
    console.log(config);
    bundle.selectService(serviceID);
  })

  $('a[href="#bundle-deploy"]').click(function() {
    if (!clicked) {
      console.log(config);
      console.log($(this).attr('id'));
      clicked = !clicked;
    }
    // $.post(standaloneServiceEndpoint, { name: cache.standalone[serviceID], id: serviceID } );
    // window.location.href = "bundle.html?id=" + $(this).attr('id');
  })
}

const runMainTemplate = () => {
  const script = document.createElement('script');
  script.src = "js/main.js";
  script.async = true;
  document.head.appendChild(script);
}

(function() {
  bundle.populateBundle()
  .then((_) => runMainTemplate());
})();