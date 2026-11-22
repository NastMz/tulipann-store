"""Demo content for the cabinet. Every name, text and plate recipe is original."""

DEPARTMENTS = [
    ("Antioquia", 18000, ["Medellín", "Rionegro", "Envigado"]),
    ("Bogotá D.C.", 12000, ["Bogotá"]),
    ("Boyacá", 16000, ["Tunja", "Villa de Leyva", "Paipa"]),
    ("Caldas", 17000, ["Manizales", "Chinchiná"]),
    ("Cundinamarca", 14000, ["Chía", "Zipaquirá", "La Calera"]),
    ("Meta", 15000, ["Villavicencio", "Restrepo", "Cumaral"]),
    ("Santander", 19000, ["Bucaramanga", "San Gil", "Barichara"]),
    ("Valle del Cauca", 20000, ["Cali", "Buga", "Palmira"]),
]

CATEGORIES = [
    {
        "slug": "bulbos", "name": "Bulbos de colección", "kind": "specimen", "position": 1,
        "description": "Bulbos seleccionados a mano, cada uno descrito en su propia lámina.",
        "subcategories": [("triunfo", "Triunfo"), ("flameados", "Flameados"), ("loro", "Loro"),
                          ("dobles", "Dobles"), ("lirio", "Flor de lirio")],
    },
    {
        "slug": "ramos", "name": "Ramos", "kind": "bouquet", "position": 2,
        "description": "Tulipanes cortados al amanecer y atados en papel de estraza.",
        "subcategories": [("ramo-corto", "Ramo corto"), ("ramo-de-taller", "Ramo de taller")],
    },
    {
        "slug": "tulipaneras", "name": "Tulipaneras", "kind": "vase", "position": 3,
        "description": "Jarrones de bocas múltiples, hechos para que cada tallo tenga su sitio.",
        "subcategories": [("azul-de-horno", "Azul de horno"), ("esmalte", "Esmalte de color")],
    },
    {
        "slug": "grabados", "name": "Grabados", "kind": "print", "position": 4,
        "description": "Láminas impresas en papel de algodón y enmarcadas en el taller.",
        "subcategories": [("sepia", "Sepia"), ("iluminados", "Iluminados a mano")],
    },
]

PRODUCTS = [
    # --- Bulbos -------------------------------------------------------------
    {"plate": 1, "name": "Aurora de los Llanos", "slug": "aurora-de-los-llanos", "category": "bulbos",
     "subcategory": "triunfo", "epithet": "Tulipa aurorae", "price": 38000, "stock": 40,
     "summary": "Copa redonda color durazno que se enciende de naranja al abrir.",
     "story": "Fue la primera variedad que el gabinete multiplicó. Abre tarde por la mañana y se cierra con "
              "la última luz, como si guardara el calor del día.\n\nSe planta a quince centímetros de "
              "profundidad, con la punta hacia arriba, en suelo que drene bien.",
     "details": [["Floración", "Media temporada"], ["Altura", "45 cm"], ["Calibre", "12/+"]],
     "art": {"petal": "#f29a6b", "leaf": "#5d7a4a", "shape": "cup", "seed": 11}},
    {"plate": 2, "name": "Viuda de Tunja", "slug": "viuda-de-tunja", "category": "bulbos",
     "subcategory": "triunfo", "epithet": "Tulipa vidua", "price": 42000, "stock": 22,
     "summary": "Granate casi negro, satinado; la más sobria de la colección.",
     "story": "Su color cambia con la luz: vino al sol, carbón a la sombra. Combina bien con blancos "
              "y con la Novia de Barichara.",
     "details": [["Floración", "Tardía"], ["Altura", "55 cm"], ["Calibre", "12/+"]],
     "art": {"petal": "#4a1424", "leaf": "#4f6b45", "shape": "cup", "seed": 23}},
    {"plate": 3, "name": "Llama de Barichara", "slug": "llama-de-barichara", "category": "bulbos",
     "subcategory": "flameados", "epithet": "Tulipa flammea", "price": 64000, "stock": 9,
     "summary": "Fondo crema con plumas carmesí que suben por cada pétalo.",
     "story": "Las flores flameadas fueron, hace siglos, las más codiciadas de todas. Esta selección "
              "repite el dibujo sin la enfermedad que antes lo producía: cada flor es distinta.",
     "details": [["Floración", "Tardía"], ["Altura", "50 cm"], ["Dibujo", "Pluma y llama"]],
     "art": {"petal": "#f4e6c8", "flame": "#a3162c", "leaf": "#5b7348", "shape": "cup", "seed": 37}},
    {"plate": 4, "name": "Cometa de Villa de Leyva", "slug": "cometa-de-villa-de-leyva", "category": "bulbos",
     "subcategory": "flameados", "epithet": "Tulipa cometes", "price": 61000, "stock": 4,
     "summary": "Amarillo limón atravesado por llamas de color ladrillo.",
     "story": "Pocas unidades por temporada: el dibujo sólo aparece en una de cada tres flores del lote "
              "madre, y esas son las que guardamos.",
     "details": [["Floración", "Media temporada"], ["Altura", "48 cm"], ["Dibujo", "Llama"]],
     "art": {"petal": "#f3d65a", "flame": "#b8461e", "leaf": "#617a44", "shape": "cup", "seed": 41}},
    {"plate": 5, "name": "Loro del Ariari", "slug": "loro-del-ariari", "category": "bulbos",
     "subcategory": "loro", "epithet": "Tulipa psittacina", "price": 52000, "stock": 15,
     "summary": "Pétalos rizados y dentados, verde y fucsia, como plumaje revuelto.",
     "story": "Las tulipas loro se abren de forma desordenada y nunca dos iguales. Duran mucho en florero.",
     "details": [["Floración", "Tardía"], ["Altura", "50 cm"], ["Forma", "Rizada"]],
     "art": {"petal": "#d43f8d", "flame": "#6f9a4a", "leaf": "#4d6e3f", "shape": "parrot", "seed": 53}},
    {"plate": 6, "name": "Peonía de Paipa", "slug": "peonia-de-paipa", "category": "bulbos",
     "subcategory": "dobles", "epithet": "Tulipa plena", "price": 47000, "stock": 18,
     "summary": "Flor doble, llena de pétalos rosa nácar, perfumada.",
     "story": "Se confunde con una peonía. Conviene tutorarla en zonas con viento: la flor pesa.",
     "details": [["Floración", "Tardía"], ["Altura", "40 cm"], ["Aroma", "Suave"]],
     "art": {"petal": "#f0b8c4", "leaf": "#5f7d4c", "shape": "double", "seed": 67}},
    {"plate": 7, "name": "Daga de Zipaquirá", "slug": "daga-de-zipaquira", "category": "bulbos",
     "subcategory": "lirio", "epithet": "Tulipa lilliflora", "price": 39000, "stock": 30,
     "summary": "Pétalos largos y en punta que se curvan hacia afuera. Blanco sal.",
     "story": "La forma de lirio es la más elegante de las tulipas. Esta, blanca, ilumina los rincones "
              "sombreados del jardín.",
     "details": [["Floración", "Media temporada"], ["Altura", "55 cm"], ["Forma", "Lirio"]],
     "art": {"petal": "#f5f1e6", "leaf": "#56724a", "shape": "lily", "seed": 71}},
    {"plate": 8, "name": "Escarcha de La Calera", "slug": "escarcha-de-la-calera", "category": "bulbos",
     "subcategory": "lirio", "epithet": "Tulipa fimbriata", "price": 44000, "stock": 3,
     "summary": "Violeta con el borde deshilachado en cristales blancos.",
     "story": "El borde fimbriado parece escarcha. Quedan pocas: es la variedad más pedida de la temporada.",
     "details": [["Floración", "Media temporada"], ["Altura", "45 cm"], ["Borde", "Fimbriado"]],
     "art": {"petal": "#6c4a9e", "flame": "#efe8f6", "leaf": "#57714b", "shape": "fringed", "seed": 83}},
    # --- Ramos ------------------------------------------------------------------
    {"plate": 9, "name": "Ramo de madrugada", "slug": "ramo-de-madrugada", "category": "ramos",
     "subcategory": "ramo-corto", "epithet": "Cinco tallos, tonos durazno", "price": 72000, "stock": 12,
     "summary": "Cinco tulipanes durazno y crema atados con pita.",
     "story": "Se cortan cerrados para que abran en casa. Cambia el agua cada dos días y recorta el tallo.",
     "details": [["Tallos", "5"], ["Duración", "7–10 días"], ["Envoltura", "Papel de estraza"]],
     "art": {"petal": "#f2a27a", "flame": "#f6e3c4", "leaf": "#5d7a4a", "shape": "cup", "stems": 5,
             "paper": "#cfae7f", "seed": 97}},
    {"plate": 10, "name": "Ramo del taller", "slug": "ramo-del-taller", "category": "ramos",
     "subcategory": "ramo-de-taller", "epithet": "Nueve tallos, selección del día", "price": 118000,
     "stock": 6, "summary": "Nueve tallos mezclados: lo mejor que salió del invernadero esa semana.",
     "story": "Nunca es el mismo ramo dos veces. Lo arma quien esté de turno en el taller.",
     "details": [["Tallos", "9"], ["Duración", "7–10 días"], ["Envoltura", "Papel de estraza"]],
     "art": {"petal": "#c8283c", "flame": "#f3d65a", "leaf": "#4f6b45", "shape": "cup", "stems": 9,
             "paper": "#d6bd93", "seed": 101}},
    {"plate": 11, "name": "Ramo luto claro", "slug": "ramo-luto-claro", "category": "ramos",
     "subcategory": "ramo-corto", "epithet": "Siete tallos, granate y blanco", "price": 89000, "stock": 0,
     "summary": "Granate profundo y blanco sal, para mesas sobrias.",
     "story": "Agotado por esta temporada; vuelve cuando florezca la Viuda de Tunja.",
     "details": [["Tallos", "7"], ["Duración", "7 días"], ["Envoltura", "Papel negro"]],
     "art": {"petal": "#4a1424", "flame": "#f5f1e6", "leaf": "#4f6b45", "shape": "lily", "stems": 7,
             "paper": "#3b3330", "seed": 113}},
    # --- Tulipaneras --------------------------------------------------------------
    {"plate": 12, "name": "Pagoda de cinco bocas", "slug": "pagoda-de-cinco-bocas", "category": "tulipaneras",
     "subcategory": "azul-de-horno", "epithet": "Loza estannífera, azul de cobalto", "price": 340000,
     "stock": 3, "summary": "Tulipanera escalonada de tres pisos con bocas para un tallo cada una.",
     "story": "Se llena de agua por la boca superior. Cada tallo queda separado y erguido, como en las "
              "tulipaneras antiguas.\n\nPintada a mano: los motivos varían de una pieza a otra.",
     "details": [["Alto", "38 cm"], ["Bocas", "5"], ["Material", "Loza esmaltada"]],
     "art": {"petal": "#f29a6b", "glaze": "#1f3f7a", "tiers": 3, "seed": 131}},
    {"plate": 13, "name": "Abanico de mesa", "slug": "abanico-de-mesa", "category": "tulipaneras",
     "subcategory": "azul-de-horno", "epithet": "Loza estannífera, azul de cobalto", "price": 210000,
     "stock": 5, "summary": "Tulipanera baja en forma de abanico, para centros de mesa.",
     "story": "Pensada para ramos cortos: los tallos se abren en abanico sin necesidad de espuma.",
     "details": [["Alto", "21 cm"], ["Bocas", "7"], ["Material", "Loza esmaltada"]],
     "art": {"petal": "#c8283c", "glaze": "#23498a", "tiers": 1, "seed": 137}},
    {"plate": 14, "name": "Torre verde musgo", "slug": "torre-verde-musgo", "category": "tulipaneras",
     "subcategory": "esmalte", "epithet": "Gres esmaltado", "price": 295000, "stock": 2,
     "summary": "Cuatro pisos en verde musgo con bocas de borde claro.",
     "story": "Esmalte de ceniza horneado a alta temperatura. Cada pieza sale con su propio tono.",
     "details": [["Alto", "44 cm"], ["Bocas", "7"], ["Material", "Gres"]],
     "art": {"petal": "#f5f1e6", "glaze": "#4f6b45", "tiers": 4, "seed": 149}},
    # --- Grabados -------------------------------------------------------------------
    {"plate": 15, "name": "Lámina de la Llama", "slug": "lamina-de-la-llama", "category": "grabados",
     "subcategory": "sepia", "epithet": "Grabado sepia, 30 × 40 cm", "price": 128000, "stock": 10,
     "summary": "La Llama de Barichara en tinta sepia, marco de roble.",
     "story": "Impresa en papel de algodón de 300 g. Cada lámina se firma y se numera en el taller.",
     "details": [["Tamaño", "30 × 40 cm"], ["Marco", "Roble"], ["Papel", "Algodón 300 g"]],
     "art": {"petal": "#6b4a2b", "flame": "#3a2616", "leaf": "#6b4a2b", "shape": "cup",
             "frame": "#7a5a34", "seed": 37}},
    {"plate": 16, "name": "Lámina del Loro", "slug": "lamina-del-loro", "category": "grabados",
     "subcategory": "iluminados", "epithet": "Grabado iluminado a mano, 30 × 40 cm", "price": 165000,
     "stock": 7, "summary": "El Loro del Ariari coloreado a la acuarela sobre el grabado.",
     "story": "Iluminar es colorear a mano una estampa ya impresa. Tarda una tarde por lámina.",
     "details": [["Tamaño", "30 × 40 cm"], ["Marco", "Nogal"], ["Técnica", "Acuarela sobre grabado"]],
     "art": {"petal": "#d43f8d", "flame": "#6f9a4a", "leaf": "#4d6e3f", "shape": "parrot",
             "frame": "#4a3322", "seed": 53}},
    {"plate": 17, "name": "Lámina de la Daga", "slug": "lamina-de-la-daga", "category": "grabados",
     "subcategory": "sepia", "epithet": "Grabado sepia, 21 × 30 cm", "price": 96000, "stock": 14,
     "summary": "Formato pequeño, ideal para pasillos y escritorios.",
     "story": "La misma plancha de la Daga de Zipaquirá, en formato de bolsillo.",
     "details": [["Tamaño", "21 × 30 cm"], ["Marco", "Roble claro"], ["Papel", "Algodón 300 g"]],
     "art": {"petal": "#6b4a2b", "leaf": "#6b4a2b", "shape": "lily", "frame": "#a98656", "seed": 71}},
]

USERS = [
    {"email": "taller@tulipann.test", "first_name": "Lucía", "last_name": "Restrepo",
     "password": "Taller.2026", "is_staff": True},
    {"email": "clara@tulipann.test", "first_name": "Clara", "last_name": "Ospina",
     "phone": "300 555 0101", "password": "Cliente.2026"},
    {"email": "tomas@tulipann.test", "first_name": "Tomás", "last_name": "Rendón",
     "phone": "300 555 0102", "password": "Cliente.2026"},
    {"email": "ines@tulipann.test", "first_name": "Inés", "last_name": "Barrera",
     "phone": "300 555 0103", "password": "Cliente.2026"},
]

# (customer, city, [(plate, qty)], final status, days ago)
ORDERS = [
    ("clara@tulipann.test", "Bogotá", [(3, 2), (7, 5)], "delivered", 12),
    ("tomas@tulipann.test", "Medellín", [(12, 1), (9, 1)], "delivered", 10),
    ("ines@tulipann.test", "Villa de Leyva", [(15, 1)], "delivered", 8),
    ("clara@tulipann.test", "Bogotá", [(5, 3), (16, 1)], "shipped", 5),
    ("tomas@tulipann.test", "Medellín", [(1, 10)], "preparing", 3),
    ("ines@tulipann.test", "Villa de Leyva", [(10, 1), (13, 1)], "paid", 1),
    ("tomas@tulipann.test", "Medellín", [(6, 4)], "awaiting_payment", 0),
]

REVIEWS = [
    ("clara@tulipann.test", 3, 5, "Las plumas carmesí salieron distintas en cada flor. Exactamente como en la lámina."),
    ("clara@tulipann.test", 7, 4, "Muy elegantes. Dos tardaron más en brotar, pero florecieron todas."),
    ("tomas@tulipann.test", 12, 5, "La tulipanera es preciosa y llegó perfectamente embalada."),
    ("tomas@tulipann.test", 9, 4, "Abrieron en casa al segundo día. Duraron más de una semana."),
    ("ines@tulipann.test", 15, 5, "El papel y la impresión son de muy buena calidad. Firmada y numerada."),
]

ARTICLES = [
    {"slug": "como-plantar-un-bulbo", "title": "Cómo plantar un bulbo sin equivocarse",
     "summary": "Profundidad, distancia y la única regla que importa: la punta hacia arriba.",
     "tags": ["cultivo", "principiantes"], "days_ago": 20,
     "body": "Un bulbo de tulipán es una flor completa esperando. Dentro ya está el tallo, las hojas y el "
             "capullo; sólo necesita frío, agua y tiempo.\n\nPlanta a una profundidad de dos a tres veces "
             "la altura del bulbo, con la punta hacia arriba y unos diez centímetros entre uno y otro.\n\n"
             "Riega una vez al plantar y después sólo si la tierra está seca. El exceso de agua es el peor "
             "enemigo del bulbo."},
    {"slug": "la-fiebre-de-los-tulipanes", "title": "La fiebre de los tulipanes",
     "summary": "Hubo un tiempo en que un solo bulbo valía lo que una casa.",
     "tags": ["historia"], "days_ago": 35,
     "body": "En el siglo XVII, en los Países Bajos, los tulipanes flameados se volvieron objeto de "
             "especulación: se compraban y vendían con pagarés, antes incluso de que florecieran.\n\n"
             "Aquellas llamas eran obra de un virus que debilitaba la planta. Las variedades flameadas de "
             "hoy son estables y sanas.\n\nNuestro catálogo toma de esa época la idea de la lámina: cada "
             "flor descrita y numerada como una pieza única."},
    {"slug": "cuidar-un-ramo", "title": "Cinco gestos para que un ramo dure",
     "summary": "Agua fría, tallo recortado y lejos de la fruta.",
     "tags": ["ramos", "cuidados"], "days_ago": 50,
     "body": "Recorta el tallo en diagonal antes de ponerlo en agua.\n\nUsa agua fría y cámbiala cada dos "
             "días.\n\nLos tulipanes siguen creciendo en el florero y se inclinan hacia la luz: gira el "
             "jarrón de vez en cuando.\n\nAléjalos de la fruta madura, que acelera el marchitamiento."},
]
