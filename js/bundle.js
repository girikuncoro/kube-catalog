const CATALOG_PER_ROW = 5;
const BUNDLE_PER_ROW = 3;

const serviceEndpoint = 'mock-data/blog-service.json';

let row = 0;
let config = {};

const catalog = {
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
      name: data.name || 'Kubelink',
      imageSrc: (data.imageSrc || 'img/kubernetes/k8s'),
    };

    let submitLink = '#';

    $('.' + type + '.row-' + count + ' div.product-carousel-active').append(' \
      <div class="col-lg-12"> \
        <div class="single-new-product"> \
          <div class="product-img"> \
            <a href="' + submitLink + '"> \
              <img src="' + service.imageSrc + '-1.png" class="first_img" alt="" /> \
              <img src="' + service.imageSrc + '-2.png" class="seceond_img" alt="" /> \
            </a> \
            <div class="new-product-action"> \
              <a href="#"><span class="lnr"></span>Add</a> \
            </div> \
          </div> \
          <div class="product-content text-center"> \
            <a href="' + submitLink + '"><h3>' + service.name + '</h3></a> \
          </div> \
        </div> \
      </div> \
    ');
  },

  populateBundle() {
    return new Promise((resolve, reject) => {

      $.getJSON(serviceEndpoint, (res) => {
        console.log(res.data);
        for (let k in res.data) {
          row = 0;
          this.injectTitle.service(k);
          config[k] = "";

          res.data[k].forEach((d, i) => {
            if ((Math.floor(i / CATALOG_PER_ROW)) === row) {
              this.injectRow(row, k);
              row++;
            }
            this.injectService(row-1, d, k);

            if (i === res.data.database.length - 1) {
              console.log(config);
              resolve(true);
            }
          })
        }
      });
    });
  },
}

const runMainTemplate = () => {
  const script = document.createElement('script');
  script.src = "js/main.js";
  script.async = true;
  document.head.appendChild(script);
}

(function() {
  catalog.populateBundle()
  .then((_) => runMainTemplate());
})();