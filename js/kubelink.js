const CATALOG_PER_ROW = 5;
const BUNDLE_PER_ROW = 3;

const standaloneServiceEndpoint = 'mock-data/standalone-service.json';
// const standaloneServiceEndpoint = 'http://10.2.1.128:5000/catalog/standalone';
const bundledServiceEndpoint = 'mock-data/bundled-service.json';

let row = 0;

const catalog = {
  injectTitle: {
    standalone() {
      $('div.new-product-area.standalone div.container').append(' \
        <div class="row"> \
					<div class="col-lg-12"> \
						<div class="section-title text-center"> \
							<h2>Standalone Services</h2> \
						</div> \
					</div> \
				</div> \
      ');
    },

    bundled() {
      $('div.new-product-area.bundled div.container').append(' \
        <div class="row"> \
					<div class="col-lg-12"> \
						<div class="section-title text-center"> \
							<h2>Bundled Services</h2> \
						</div> \
					</div> \
				</div> \
      ');
    },
  },

  injectRow(count, type) {
    console.log(type)
    $('div.new-product-area.' + type + ' div.container').append(' \
      <div class="row row-' + count + '"> \
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

    const submit = type === 'bundled' ? 'Customize' : 'Deploy';

    $('.' + type + ' .row-' + count + ' div.product-carousel-active').append(' \
      <div class="col-lg-12"> \
        <div class="single-new-product"> \
          <div class="product-img"> \
            <a href="product-details.html"> \
              <img src="' + service.imageSrc + '-1.png" class="first_img" alt="" /> \
              <img src="' + service.imageSrc + '-2.png" class="seceond_img" alt="" /> \
            </a> \
            <div class="new-product-action"> \
              <a href="#"><span class="lnr"></span>' + submit + '</a> \
            </div> \
          </div> \
          <div class="product-content text-center"> \
            <a href="product-details.html"><h3>' + service.name + '</h3></a> \
          </div> \
        </div> \
      </div> \
    ');
  },

  populateStandalone() {
    return new Promise((resolve, reject) => {
      this.injectTitle.standalone();

      $.getJSON(standaloneServiceEndpoint, (res) => {
        console.log(res);
        res.data.forEach((d, i) => {
          console.log(d,i);
          if ((Math.floor(i / CATALOG_PER_ROW)) === row) {
            this.injectRow(row, 'standalone');
            row++;
          }
          this.injectService(row-1, d, 'standalone');

          if (i === res.data.length - 1) {
            resolve(true);
          }
        });
      });
    });
  },

  populateBundled() {
    return new Promise((resolve, reject) => {
      row = 0;
      this.injectTitle.bundled();

      $.getJSON(bundledServiceEndpoint, (res) => {
        res.data.forEach((d, i) => {
          if ((Math.floor(i / CATALOG_PER_ROW)) === row) {
            this.injectRow(row, 'bundled');
            row++;
          }
          this.injectService(row-1, d, 'bundled');

          if (i === res.data.length - 1) {
            resolve(true);
          }
        });
      });
    });
  },
};

const runMainTemplate = () => {
  const script = document.createElement('script');
  script.src = "js/main.js";
  script.async = true;
  document.head.appendChild(script);
}

(function() {
  catalog.populateStandalone()
  .then((_) => catalog.populateBundled())
  .then((_) => runMainTemplate());
})();