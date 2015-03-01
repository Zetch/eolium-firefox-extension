
// relatedTarget is bugged in Firefox, always returns null
// Disabled until it will be fixed
function closePopup(e) {
  var popup = e.target;
  var clickTarget = e.relatedTarget || e.toElement;
  var menu = document.querySelector('#menu-'+popup.getAttribute('name'));
  if (!clickTarget ||
     (!(clickTarget.parentNode === popup) &&
      !(clickTarget.parentNode.parentNode === popup) &&
      !(clickTarget === menu) &&
      !(clickTarget === menu.querySelector('span')) ) ) {
    popup.classList.remove('show');
    menu.querySelector('span').classList.remove('active');
  }
}

function togglePopup(e) {
  // Prevent default event
  e.preventDefault();

  // Toggle active
  var menu = this; // Use 'this', event.target may uses span inside link
  var menuBarBounds = menu.parentNode.getBoundingClientRect();
  var arrow = menu.querySelector('span');
  var arrowBounds = arrow.getBoundingClientRect();
  arrow.classList.toggle('active');

  var name = menu.getAttribute('name');
  var popup = document.querySelector('#popup-'+name);
  var orientation = popup.classList.contains('ltr') ? 'ltr':'rtl';

  // Put menu on arrow position
  var popupBounds = popup.getBoundingClientRect();
  if (orientation === 'ltr') {
    popup.style.left = arrowBounds.right - menuBarBounds.left -3 +"px";
  } else if (orientation === 'rtl') {
    // RTL orientation, 165 = popup width
    popup.style.left = arrowBounds.right - menuBarBounds.left -165 -3 +"px";
  };

  // Toggle popup
  if (popup.classList.toggle('show')) {
    popup.focus();
  }
}

function toggleSubmenu(e) {
  e.preventDefault();
  var link = this;
  if (!link.classList.contains('active')) {
    // Remove active class and show other submenu
    Array.prototype.forEach.call(link.parentNode.childNodes, function(node) {
      node.classList.remove('show');   // Submenu nodes
      node.classList.remove('active'); // Anchor nodes
    });
  }
  // Active them on current menu and anchor
  link.classList.toggle('active');
  var submenu = link.nextSibling;
  submenu.classList.toggle('show');
}

var navigation = {
  'xbone': {
    'title': 'Xbox One',
    'align': 'ltr',
    'links': [
      ['General',        '/foro_xbox-one-general_200'],
      ['Juegos',         '/foro_xbox-one-juegos_207'],
      ['Online',         '/foro_xbox-one-online_210']
    ]
  },
  'ps4': {
    'title': 'PlayStation 4',
    'align': 'ltr',
    'links': [
      ['General',        '/foro_playstation-4-general_201'],
      ['Juegos',         '/foro_playstation-4-juegos_208'],
      ['Online',         '/foro_playstation-4-online_209']
    ]
  },
  'wiiu': {
    'title': 'Wii U',
    'align': 'ltr',
    'links': [
      ['General',        '/foro_wii-u-general_191'],
      ['Juegos',         '/foro_wii-u-juegos_194'],
      ['Online',         '/foro_wii-u-online_211']
    ]
  },
  'ps3': {
    'title': 'PlayStation 3',
    'align': 'ltr',
    'links': [
      ['General',           '/foro_playstation-3-general_149'],
      ['Juegos',            '/foro_playstation-3-juegos_161'],
      ['Online',            '/foro_playstation-3-online_162'],
      ['Scene',             '/foro_playstation-3-scene_163'],
      ['Modchips/Softmods', '/foro_playstation-3-modchips-y-softmods_179'],
      ['Carga de Backups',  '/foro_playstation-3-carga-de-backups_180']
    ]
  },
  '360': {
    'title': 'Xbox 360',
    'align': 'ltr',
    'links': [
      ['General',           '/foro_xbox-360-general_129'],
      ['Juegos',            '/foro_xbox-360-juegos_138'],
      ['Online',            '/foro_xbox-360-online_142'],
      ['Mod. de Lectores',  '/foro_xbox-360-modificacion-de-lectores_143'],
      ['Grabación',         '/foro_xbox-360-grabacion_151'],
      ['Exploits/Homebrew', '/foro_xbox-360-exploits-y-homebrew_178']
    ]
  },
  'vita': {
    'title': 'PS Vita',
    'align': 'rtl',
    'links': [
      ['General',        '/foro_ps-vita-general_185'],
      ['Juegos',         '/foro_ps-vita-juegos_187'],
      ['Online',         '/foro_ps-vita-online_190'],
      ['Scene',          '/foro_ps-vita-scene_192']
    ]
  },
  '3ds': {
    'title': 'Nintendo 3DS',
    'align': 'rtl',
    'links': [
      ['General',        '/foro_nintendo-3ds-general_182'],
      ['Juegos',         '/foro_nintendo-3ds-juegos_184'],
      ['Online',         '/foro_nintendo-3ds-online_189'],
      ['Scene',          '/foro_nintendo-3ds-scene_202']
    ]
  },
  'otras': {
    'title': 'Otras Consolas',
    'align': 'rtl',
    'links': [
      ['Wii',
        [
          ['General',        '/foro_wii-general_148',],
          ['Juegos',         '/foro_wii-juegos_155',],
          ['Online',         '/foro_wii-online_156',],
          ['Scene',          '/foro_wii-scene_165',],
          ['Modchips',       '/foro_wii-modchips_158',],
          ['Softmods',       '/foro_wii-softmods_170',],
          ['Parches',        '/foro_wii-parches-y-grabacion_171']
        ]
      ],
      ['PSP',
        [
          ['General',            '/foro_psp-general_126'],
          ['Juegos',             '/foro_psp-juegos_133'],
          ['Scene',              '/foro_psp-scene_128'],
          ['Firmwares/Modchips', '/foro_psp-firmwares-y-modchips_153'],
          ['Backups',            '/foro_psp-carga-de-backups_134']
        ]
      ],
      ['Nintendo DS',
        [
          ['General',     '/foro_nds-general_125'],
          ['Juegos',      '/foro_nds-juegos_135'],
          ['Flash Carts', '/foro_nds-flash-carts_150'],
          ['Scene',       '/foro_nds-scene_130'],
          ['Backups',     '/foro_nds-carga-de-backups_136']
        ]
      ],
      ['PlayStation 2',
        [
          ['General',          '/foro_playstation-2-general_16'],
          ['Juegos',            '/foro_playstation-2-juegos_23'],
          ['Online',            '/foro_playstation-2-online_103'],
          ['Modchips',          '/foro_playstation-2-modchips_24'],
          ['Cog-Swap',          '/foro_playstation-2-cog-swap_73'],
          ['Parches/Grabación', '/foro_playstation-2-parches-y-grabacion_74'],
          ['Scene',             '/foro_playstation-2-scene_124']
        ]
      ],
      ['Xbox',         '/foro_otras-consolas-xbox_78'],
      ['GameCube',     '/foro_otras-consolas-gamecube_85'],
      ['Dreamcast',    '/foro_otras-consolas-dreamcast_6'],
      ['PlayStation',  '/foro_otras-consolas-playstation_81'],
      ['GBA',          '/foro_otras-consolas-gba_66'],
      ['Multiplataforma', '/foro_otras-consolas-multiplataforma_22'],
      ['Alternativas', '/foro_otras-consolas-consolas-alternativas_120'],
      ['Clásicas',     '/foro_otras-consolas-consolas-clasicas_80'],
      ['Desarrollo',   'http://www.elotrolado.net/foro_otras-consolas-desarrollo_152']
    ]
  },
  'more': {
    'title': 'Más',
    'align': 'rtl',
    'links': [
      ['Off-topic',
        [
          ['Miscelánea',       '/foro_off-topic-miscelanea_11'],
          ['El rincón de EOL', '/foro_off-topic-el-rincon-del-eoliano_67'],
          ['Manganime/Cómics', '/foro_off-topic-manganime-y-comics_60'],
          ['Literatura',       '/foro_off-topic-literatura_61'],
          ['Música',           '/foro_off-topic-musica_115'],
          ['Cine',             '/foro_off-topic-cine_59'],
          ['ex-Pruebas',       '/foro_off-topic-ex-pruebas_21']
        ]
      ],
      ['Compra-Venta',
        [
          ['Nueva Generación', '/foro_compra-venta-nueva-generacion_212'],
          ['Actuales',         '/foro_compra-venta-consolas-actuales_97'],
          ['Modernas',         '/foro_compra-venta-consolas-modernas_164'],
          ['Clásicas',         '/foro_compra-venta-consolas-clasicas_98'],
          ['Informática',      '/foro_compra-venta-informatica_99'],
          ['Otros',            '/foro_compra-venta-otros_100'],
          ['Feedback',         '/foro_compra-venta-feedback-cv_117']
        ]
      ],
      ['Noticias',
        [
          ['El Buffer',  '/foro_noticias-el-buffer_157'],
          ['Consolas',   '/foro_noticias-consolas_195'],
          ['Juegos',     '/foro_noticias-juegos_196'],
          ['Scene',      '/foro_noticias-scene_197'],
          ['Tecnología', '/foro_noticias-tecnologia_33'],
          ['Internet',   '/foro_noticias-internet_90'],
          ['Otros',      '/foro_noticias-otros_30']
        ]
      ],
      ['Feedback',
        [
          ['Políticas EOL',       '/foro_feedback-politicas-de-eol_10'],
          ['Cuestiones técnicas', '/foro_feedback-cuestiones-tecnicas_166'],
          ['Wiki',                '/foro_feedback-wiki_159'],
          ['Compra-Venta',        '/foro_compra-venta-feedback-cv_117']
        ]
      ],
      ['Wiki', '/wiki/']
    ]
  },
  'pc': {
    'title': 'PC',
    'align': 'rtl',
    'links': [
      ['General',        '/foro_pc-general_18'],
      ['Hardware',       '/foro_pc-hardware_9'],
      ['Mac',            '/foro_pc-mac_169'],
      ['Software Libre', '/foro_pc-software-libre_84'],
      ['Juegos',         '/foro_pc-juegos_62']
    ]
  },
  'tecno': {
    'title': 'Tecnología',
    'align': 'rtl',
    'links': [
      ['Telefonía',      '/foro_tecnologia-telefonia_119'],
      ['Electrónica',    '/foro_tecnologia-electronica-de-consumo_141']
    ]
  }
}

var contentWrap = document.querySelector("#content-wrap");
var menu        = contentWrap.querySelector("#menu");

// Remove 'other' and 'more' popups
document.getElementById('popup-more').remove();
document.getElementById('menu-more').querySelector('span').remove();
document.getElementById('popup-otras').remove();
document.getElementById('menu-otras').querySelector('span').remove();

// Create navigation popups
for (name in navigation) {
  if (navigation.hasOwnProperty(name)) {

    // Bind nav
    var nav = menu.querySelector('#menu-'+name);

    // Check is valid, it could dissapear
    if (nav) {
      nav.setAttribute('name', name);
      var orientation = navigation[name].align
      nav.classList.add(orientation);
    } else {
      nav = document.createElement('a');
      nav.textContent = navigation[name].title;
      nav.setAttribute('name', name);
      nav.setAttribute('id', 'menu-'+name);
      var orientation = navigation[name].align;
      nav.classList.add(orientation)
      menu.appendChild(nav);
    }

    // Add arrow
    var arrow = document.createElement("span");
    if (orientation === 'ltr') {
      nav.insertBefore(arrow, nav.firstChild);
    } else if (orientation === 'rtl') {
      nav.appendChild(arrow);
    }

    // Create popup
    var popup = document.createElement('div');
    popup.setAttribute('id', 'popup-'+name);
    popup.setAttribute('class', 'popup-navigation '+orientation);
    popup.setAttribute('name', name);
    popup.setAttribute('tabindex', '-1');

    // Create links
    Array.prototype.forEach.call(navigation[name].links, function(link) {
      var anchor = document.createElement('a');
      var submenu;

      anchor.textContent = link[0];

      if (typeof(link[1]) === 'string') {
        anchor.setAttribute('href', link[1]);
      } else {
        // Add arrow to show is expandable
        var arrow = document.createElement("span");
        if (orientation === 'ltr') {
          anchor.appendChild(arrow);
        } else if (orientation === 'rtl') {
          anchor.insertBefore(arrow, anchor.firstChild);
        }

        // Add submenu links
        submenu = document.createElement("div");
        submenu.classList.add('submenu');

        var sublinks = link[1];
        sublinks.forEach(function(sublink) {
          var subanchor = document.createElement('a');
          subanchor.textContent = sublink[0];
          subanchor.setAttribute('href', sublink[1]);
          submenu.appendChild(subanchor);
        });

        anchor.addEventListener('click', toggleSubmenu);
      }

      popup.appendChild(anchor);
      if (submenu) popup.appendChild(submenu);
    });

    // Setup menu events
    nav.addEventListener('click', togglePopup);
    //popup.addEventListener('blur', closePopup); //bugged

    contentWrap.appendChild(popup);
  }
}