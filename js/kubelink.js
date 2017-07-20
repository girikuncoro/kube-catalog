const CATALOG_PER_ROW = 5;
const BUNDLE_PER_ROW = 3;

// const standaloneServiceEndpoint = 'mock-data/standalone-service.json';
// const bundledServiceEndpoint = 'mock-data/bundled-service.json';
const baseUrl = 'http://orch.kubelink.borathon.photon-infra.com';
// const baseUrl = '10.2.1.128:5000';
const standaloneServiceEndpoint = baseUrl + '/catalog/standalone';
const bundledServiceEndpoint = baseUrl + '/catalog/bundles';

let row = 0;

let cache = { standalone: {}, bundled: {} };

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
      id: data.id || '',
      name: data.name || 'Kubelink',
      imageSrc: (data.imageSrc || 'img/kubernetes/k8s'),
    };

    let submit, submitLink;
    if (type === 'standalone') {
      submit = 'Deploy';
      submitLink = '#kubelink-deploy-standalone';
    } else if (type === 'bundled') {
      submit = 'Customize';
      submitLink = '#kubelink-deploy-bundle';
    }

    $('.' + type + ' .row-' + count + ' div.product-carousel-active').append(' \
      <div class="col-lg-12"> \
        <div class="single-new-product"> \
          <div class="product-img"> \
            <a href="' + submitLink + '" id="' + service.id + '"> \
              <img src="' + service.imageSrc + '-1.png" class="first_img" alt="" /> \
              <img src="' + service.imageSrc + '-2.png" class="seceond_img" alt="" /> \
            </a> \
            <div class="new-product-action"> \
              <a href="#"><span class="lnr"></span>' + submit + '</a> \
            </div> \
          </div> \
          <div class="product-content text-center"> \
            <a href="' + submitLink + '" id="' + service.id + '"><h3>' + service.name + '</h3></a> \
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
        // cache.standalone = res.data;
        res.data.forEach((d, i) => {
          cache.standalone[d.id] = d.name;
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
        // cache.bundled = res.data;
        res.data.forEach((d, i) => {
          cache.bundled[d.id] = d.name;
          if ((Math.floor(i / CATALOG_PER_ROW)) === row) {
            this.injectRow(row, 'bundled');
            row++;
          }
          this.injectService(row-1, d, 'bundled');

          if (i === res.data.length - 1) {
            eventHandlerInit();
            resolve(true);
          }
        });
      });
    });
  },
};

const eventHandlerInit = () => {
  $('a[href="#kubelink-deploy-standalone"]').click(function() {
    console.log('standalone clicked!');

    const serviceID = $(this).attr('id');

    console.log(serviceID);
    console.log(cache);
    console.log(cache.standalone[serviceID]);

    $.ajax({
      url: standaloneServiceEndpoint,
      type: "POST",
      data: JSON.stringify({ "name": cache.standalone[serviceID], "id": serviceID }),
      contentType: "application/json",
      success: function(data){
        console.log(data);
      }
    })
  })

  $('a[href="#kubelink-deploy-bundle"]').click(function() {
    console.log('bundle clicked!');
    console.log($(this).attr('id'));
    window.location.href = "bundle.html?id=" + $(this).attr('id');
  })
}

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