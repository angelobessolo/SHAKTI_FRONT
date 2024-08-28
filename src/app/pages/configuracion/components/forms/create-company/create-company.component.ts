import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ToastrAlertService } from '../../../../../services/toastr/toastr-alert.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { map, Observable, startWith } from 'rxjs';
import { CitiesService } from '../../../../../shared/services/cities/cities.service';
import { ConfigurationService } from '../../../../../services/configuration/configuration.service';
import { DocumentType } from '../../../../../shared/enums/document-type.enum';


@Component({
  selector: 'app-create-company',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    CommonModule, 
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxSpinnerModule, 
    NgxMatSelectSearchModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {
  private configurationService = inject(ConfigurationService);
  private citiesService = inject(CitiesService);
  private toastr = inject(ToastrAlertService);
  private spinner = inject(NgxSpinnerService);
  private formBuilder = inject(FormBuilder);
  private fb = inject(FormBuilder);
  createCompanyForm!: FormGroup;
  documentTypes = Object.values(DocumentType);

  // codciuu = Object.values(CodigoCiuu);
  codciuu: string[] = [
    "0111 Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas",
    "0112 Cultivo de arroz",
    "0113 Cultivo de hortalizas, raíces y tubérculos",
    "0114 Cultivo de tabaco",
    "0115 Cultivo de plantas textiles",
    "0119 Otros cultivos transitorios n.c.p.",
    "0121 Cultivo de frutas tropicales y subtropicales",
    "0122 Cultivo de plátano y banano",
    "0123 Cultivo de café",
    "0124 Cultivo de caña de azúcar",
    "0125 Cultivo de flor de corte",
    "0126 Cultivo de palma para aceite (palma africana) y otros frutos oleaginosos",
    "0127 Cultivo de plantas con las que se preparan bebidas",
    "0128 Cultivo de especias y de plantas aromáticas y medicinales",
    "0129 Otros cultivos permanentes n.c.p.",
    "0130 Propagación de plantas (actividades de los viveros, excepto viveros forestales)",
    "0141 Cría de ganado bovino y bufalino",
    "0142 Cría de caballos y otros equinos",
    "0143 Cría de ovejas y cabras",
    "0144 Cría de ganado porcino",
    "0145 Cría de aves de corral",
    "0149 Cría de otros animales n.c.p.",
    "0150 Explotación mixta (agrícola y pecuaria)",
    "0161 Actividades de apoyo a la agricultura",
    "0162 Actividades de apoyo a la ganadería",
    "0163 Actividades posteriores a la cosecha",
    "0164 Tratamiento de semillas para propagación",
    "0170 Caza ordinaria y mediante trampas y actividades de servicios conexas",
    "0210 Silvicultura y otras actividades forestales",
    "0220 Extracción de madera",
    "0230 Recolección de productos forestales diferentes a la madera",
    "0240 Servicios de apoyo a la silvicultura",
    "0311 Pesca marítima",
    "0312 Pesca de agua dulce",
    "0321 Acuicultura marítima",
    "0322 Acuicultura de agua dulce",
    "0510 Extracción de hulla (carbón de piedra)",
    "0520 Extracción de carbón lignito",
    "0610 Extracción de petróleo crudo",
    "0620 Extracción de gas natural",
    "0710 Extracción de minerales de hierro",
    "0721 Extracción de minerales de uranio y de torio",
    "0722 Extracción de oro y otros metales preciosos",
    "0723 Extracción de minerales de níquel",
    "0729 Extracción de otros minerales metalíferos no ferrosos n.c.p.",
    "0811 Extracción de piedra, arena, arcillas comunes, yeso y anhidrita",
    "0812 Extracción de arcillas de uso industrial, caliza, caolín y bentonitas",
    "0820 Extracción de esmeraldas, piedras preciosas y semipreciosas",
    "0891 Extracción de minerales para la fabricación de abonos y productos químicos",
    "0892 Extracción de halita (sal)",
    "0899 Extracción de otros minerales no metálicos n.c.p.",
    "0910 Actividades de apoyo para la extracción de petróleo y de gas natural",
    "0990 Actividades de apoyo para otras actividades de explotación de minas y canteras",
    "1011 Procesamiento y conservación de carne y productos cárnicos",
    "1012 Procesamiento y conservación de pescados, crustáceos y moluscos",
    "1020 Procesamiento y conservación de frutas, legumbres, hortalizas y tubérculos",
    "1030 Elaboración de aceites y grasas de origen vegetal y animal",
    "1040 Elaboración de productos lácteos",
    "1051 Elaboración de productos de molinería",
    "1052 Elaboración de almidones y productos derivados del almidón",
    "1061 Trilla de café",
    "1062 Descafeinado, tostión y molienda del café",
    "1063 Otros derivados del café",
    "1071 Elaboración y refinación de azúcar",
    "1072 Elaboración de panela",
    "1081 Elaboración de productos de panadería",
    "1082 Elaboración de cacao, chocolate y productos de confitería",
    "1083 Elaboración de macarrones, fideos, alcuzcuz y productos farináceos similares",
    "1084 Elaboración de comidas y platos preparados",
    "1089 Elaboración de otros productos alimenticios n.c.p.",
    "1090 Elaboración de alimentos preparados para animales",
    "1101 Destilación, rectificación y mezcla de bebidas alcohólicas",
    "1102 Elaboración de bebidas fermentadas no destiladas",
    "1103 Producción de malta, elaboración de cervezas y otras bebidas malteadas",
    "1104 Elaboración de bebidas no alcohólicas, producción de aguas minerales y de otras aguas embotelladas",
    "1200 Elaboración de productos de tabaco",
    "1311 Preparación e hilatura de fibras textiles",
    "1312 Tejeduría de productos textiles",
    "1313 Acabado de productos textiles",
    "1391 Fabricación de tejidos de punto y ganchillo",
    "1392 Confección de artículos con materiales textiles, excepto prendas de vestir",
    "1393 Fabricación de tapetes y alfombras para pisos",
    "1394 Fabricación de cuerdas, cordeles, cables, bramantes y redes",
    "1399 Fabricación de otros artículos textiles n.c.p.",
    "1410 Confección de prendas de vestir, excepto prendas de piel",
    "1420 Fabricación de artículos de piel",
    "1430 Fabricación de artículos de punto y ganchillo",
    "1511 Curtido y recurtido de cueros; recurtido y teñido de pieles",
    "1512 Fabricación de artículos de viaje, bolsos de mano y artículos similares elaborados en cuero, y fabricación de artículos de talabartería y guarnicionería",
    "1513 Fabricación de artículos de viaje, bolsos de mano y artículos similares; artículos de talabartería y guarnicionería elaborados en otros materiales",
    "1521 Fabricación de calzado de cuero y piel, con cualquier tipo de suela",
    "1522 Fabricación de otros tipos de calzado, excepto calzado de cuero y piel",
    "1523 Fabricación de partes del calzado",
    "1610 Aserrado, acepillado e impregnación de la madera",
    "1620 Fabricación de hojas de madera para enchapado; fabricación de tableros contrachapados, tableros laminados, tableros de partículas y otros tableros y paneles",
    "1630 Fabricación de partes y piezas de madera, de carpintería y ebanistería para la construcción",
    "1640 Fabricación de recipientes de madera",
    "1690 Fabricación de otros productos de madera; fabricación de artículos de corcho, cestería y espartería",
    "1701 Fabricación de pulpas (pastas) celulósicas; papel y cartón",
    "1702 Fabricación de papel y cartón ondulado (corrugado); fabricación de envases, empaques y de embalajes de papel y cartón.",
    "1709 Fabricación de otros artículos de papel y cartón",
    "1811 Actividades de impresión",
    "1812 Actividades de servicios relacionados con la impresión",
    "1820 Producción de copias a partir de grabaciones originales",
    "1910 Fabricación de productos de hornos de coque",
    "1921 Fabricación de productos de la refinación del petróleo",
    "1922 Actividad de mezcla de combustibles",
    "2011 Fabricación de sustancias y productos químicos básicos",
    "2012 Fabricación de abonos y compuestos inorgánicos nitrogenados",
    "2013 Fabricación de plásticos en formas primarias",
    "2014 Fabricación de caucho sintético en formas primarias",
    "2021 Fabricación de plaguicidas y otros productos químicos de uso agropecuario",
    "2022 Fabricación de pinturas, barnices y revestimientos similares, tintas para impresión y masillas",
    "2023 Fabricación de jabones y detergentes, preparados para limpiar y pulir; perfumes y preparados de tocador",
    "2029 Fabricación de otros productos químicos n.c.p.",
    "2030 Fabricación de fibras sintéticas y artificiales",
    "2100 Fabricación de productos farmacéuticos, sustancias químicas medicinales y productos botánicos de uso farmacéutico",
    "2211 Fabricación de llantas y neumáticos de caucho",
    "2212 Reencauche de llantas usadas",
    "2219 Fabricación de formas básicas de caucho y otros productos de caucho n.c.p.",
    "2221 Fabricación de formas básicas de plástico",
    "2229 Fabricación de artículos de plástico n.c.p.",
    "2310 Fabricación de vidrio y productos de vidrio",
    "2391 Fabricación de productos refractarios",
    "2392 Fabricación de materiales de arcilla para la construcción",
    "2393 Fabricación de otras obras de construcción en piedra o de productos de hormigón, cemento y yeso",
    "2394 Fabricación de productos de cemento y hormigón para la construcción",
    "2395 Fabricación de artículos de cerámica para la construcción",
    "2399 Fabricación de otros productos minerales no metálicos n.c.p.",
    "2511 Fabricación de estructuras metálicas y sus componentes",
    "2512 Fabricación de calderas industriales",
    "2520 Fabricación de radiadores y calefactores de agua y de vapor",
    "2591 Forja, estampado, embutido y laminado de metales; metalurgia de polvos",
    "2592 Tratamiento y revestimiento de metales; mecanizado",
    "2593 Fabricación de productos de cuchillería y de utensilios de cocina; fabricación de herramientas",
    "2599 Fabricación de otros productos de metal n.c.p.",
    "2610 Fabricación de productos electrónicos de consumo",
    "2620 Fabricación de productos electrónicos de comunicación",
    "2630 Fabricación de equipos de telecomunicaciones",
    "2640 Fabricación de equipos de radio y televisión",
    "2651 Fabricación de equipos de soporte a la vida",
    "2652 Fabricación de equipo de medición, verificación, navegación y control",
    "2660 Fabricación de equipos de grabación y reproducción de sonido y de imagen",
    "2670 Fabricación de equipos y aparatos eléctricos",
    "2680 Fabricación de productos informáticos, electrónicos y ópticos",
    "2710 Fabricación de motores, generadores y transformadores eléctricos",
    "2720 Fabricación de baterías y acumuladores eléctricos",
    "2730 Fabricación de cables de fibra óptica y de cables eléctricos",
    "2740 Fabricación de lámparas y de equipos de iluminación",
    "2750 Fabricación de aparatos electrodomésticos no eléctricos",
    "2811 Fabricación de motores y turbinas, excepto los destinados a aeronaves",
    "2812 Fabricación de equipos hidráulicos y neumáticos",
    "2821 Fabricación de maquinaria para la agricultura y la ganadería",
    "2822 Fabricación de maquinaria para la minería, la construcción y la ingeniería civil",
    "2823 Fabricación de maquinaria para la industria alimentaria y de bebidas",
    "2824 Fabricación de maquinaria para la industria textil y de prendas de vestir",
    "2825 Fabricación de maquinaria para la industria del papel, del cartón y de la madera",
    "2826 Fabricación de maquinaria para la industria del caucho y de plásticos",
    "2829 Fabricación de otras máquinas y equipos n.c.p.",
    "2910 Fabricación de vehículos automotores",
    "2920 Fabricación de remolques y semirremolques",
    "2930 Fabricación de carrocerías para vehículos automotores; fabricación de partes y accesorios para vehículos automotores",
    "3011 Construcción de barcos y embarcaciones",
    "3012 Construcción de embarcaciones menores",
    "3020 Construcción de aeronaves y naves espaciales",
    "3030 Fabricación de vehículos ferroviarios y de tranvías",
    "3040 Fabricación de vehículos militares y equipos de combate",
    "3091 Fabricación de bicicletas y vehículos similares",
    "3092 Fabricación de motocicletas y de sus partes",
    "3099 Fabricación de otros vehículos de transporte n.c.p.",
    "3101 Fabricación de muebles de oficina y de comercio",
    "3102 Fabricación de muebles de cocina",
    "3103 Fabricación de colchones y de somieres",
    "3109 Fabricación de otros muebles",
    "3211 Fabricación de joyas y artículos relacionados",
    "3212 Fabricación de instrumentos musicales",
    "3220 Fabricación de relojes",
    "3291 Fabricación de artículos de cuchillería",
    "3292 Fabricación de artículos de ferretería y herramientas",
    "3299 Fabricación de otros productos manufacturados n.c.p.",
    "3311 Reparación y mantenimiento de equipos eléctricos de uso doméstico y de la industria",
    "3312 Reparación y mantenimiento de maquinaria industrial",
    "3313 Reparación y mantenimiento de maquinaria para la agricultura y la ganadería",
    "3314 Reparación y mantenimiento de maquinaria para la industria alimentaria y de bebidas",
    "3315 Reparación y mantenimiento de maquinaria para la industria textil y de prendas de vestir",
    "3316 Reparación y mantenimiento de maquinaria para la industria del papel, del cartón y de la madera",
    "3317 Reparación y mantenimiento de maquinaria para la industria del caucho y de plásticos",
    "3321 Reparación y mantenimiento de vehículos automotores",
    "3322 Reparación y mantenimiento de motocicletas y de sus partes",
    "3323 Reparación y mantenimiento de bicicletas y vehículos similares",
    "3324 Reparación y mantenimiento de remolques y semirremolques",
    "3325 Reparación y mantenimiento de carrocerías para vehículos automotores",
    "3326 Reparación y mantenimiento de vehículos ferroviarios y de tranvías",
    "3327 Reparación y mantenimiento de vehículos militares y equipos de combate",
    "3328 Reparación y mantenimiento de aeronaves y naves espaciales",
    "3329 Reparación y mantenimiento de otros vehículos de transporte n.c.p.",
    "3511 Suministro de energía eléctrica",
    "3512 Distribución de energía eléctrica",
    "3520 Suministro de gas y vapor",
    "3530 Suministro de agua, saneamiento y actividades de gestión de residuos",
    "3600 Captación, tratamiento y distribución de agua",
    "3700 Gestión de residuos y actividades de descontaminación",
    "3811 Recogida de residuos no peligrosos",
    "3812 Recogida de residuos peligrosos",
    "3821 Tratamiento y eliminación de residuos no peligrosos",
    "3822 Tratamiento y eliminación de residuos peligrosos",
    "3900 Actividades de descontaminación y otros servicios de gestión de residuos",
    "4110 Promoción inmobiliaria",
    "4120 Construcción de edificios residenciales",
    "4210 Construcción de carreteras y autopistas",
    "4220 Construcción de obras de ingeniería civil",
    "4290 Construcción de otras obras de ingeniería civil",
    "4310 Demolición y preparación del terreno",
    "4321 Instalación de sistemas eléctricos en edificios",
    "4322 Instalación de sistemas de fontanería, calefacción y aire acondicionado",
    "4323 Instalación de sistemas de seguridad",
    "4330 Acabado de edificios",
    "4390 Otras actividades especializadas de construcción",
    "4511 Venta de automóviles y vehículos de motor ligeros",
    "4512 Venta de vehículos de motor pesados",
    "4520 Mantenimiento y reparación de vehículos de motor",
    "4530 Venta de repuestos y accesorios de vehículos de motor",
    "4540 Venta, reparación y mantenimiento de motocicletas y de sus partes",
    "4610 Comercio al por mayor de productos agropecuarios",
    "4620 Comercio al por mayor de productos alimenticios, bebidas y tabacos",
    "4630 Comercio al por mayor de textiles, prendas de vestir y calzado",
    "4640 Comercio al por mayor de muebles, aparatos domésticos y otros artículos para el hogar",
    "4650 Comercio al por mayor de equipos informáticos, equipos de telecomunicaciones y de otros equipos",
    "4660 Comercio al por mayor de maquinaria y equipo para la agricultura y la ganadería",
    "4670 Comercio al por mayor de otros productos no alimenticios",
    "4680 Comercio al por mayor de productos no clasificados en otras partes",
    "4711 Comercio al por menor en establecimientos no especializados",
    "4712 Comercio al por menor en establecimientos especializados",
    "4721 Comercio al por menor de productos alimenticios, bebidas y tabacos en tiendas especializadas",
    "4722 Comercio al por menor de productos no alimenticios en tiendas especializadas",
    "4730 Comercio al por menor de combustibles, lubricantes y productos relacionados",
    "4741 Comercio al por menor de equipos informáticos y de telecomunicaciones en establecimientos especializados",
    "4742 Comercio al por menor de artículos de segunda mano en tiendas",
    "4751 Comercio al por menor de materiales de construcción y artículos de ferretería",
    "4752 Comercio al por menor de equipos y aparatos eléctricos",
    "4753 Comercio al por menor de artículos de ferretería, fontanería y calefacción",
    "4761 Comercio al por menor de libros, periódicos y artículos de papelería",
    "4762 Comercio al por menor de música y vídeo",
    "4771 Comercio al por menor de prendas de vestir",
    "4772 Comercio al por menor de calzado y artículos de cuero",
    "4773 Comercio al por menor de productos farmacéuticos y medicinales",
    "4774 Comercio al por menor de artículos de perfumería y cosméticos",
    "4775 Comercio al por menor de artículos de relojería y joyería",
    "4776 Comercio al por menor de artículos para el hogar",
    "4777 Comercio al por menor de productos textiles en tiendas especializadas",
    "4778 Comercio al por menor de otros artículos en establecimientos especializados",
    "4790 Comercio al por menor no realizado en establecimientos, puestos de venta o mercadillos",
    "4910 Transporte ferroviario de pasajeros",
    "4920 Transporte ferroviario de mercancías",
    "4930 Transporte por tubería",
    "5010 Transporte marítimo de mercancías",
    "5020 Transporte marítimo de pasajeros",
    "5030 Transporte fluvial de mercancías",
    "5040 Transporte fluvial de pasajeros",
    "5110 Transporte aéreo de pasajeros",
    "5120 Transporte aéreo de mercancías",
    "5210 Transporte de mercancías por carretera",
    "5221 Transporte de mercancías por ferrocarril",
    "5222 Transporte de mercancías por carretera",
    "5223 Transporte de mercancías por tuberías",
    "5310 Servicios postales nacionales e internacionales",
    "5320 Servicios de mensajería",
    "5510 Alojamientos turísticos y otros alojamientos",
    "5520 Alojamientos turísticos y otros alojamientos",
    "5610 Restaurantes y puestos de comidas",
    "5621 Servicios de comidas preparadas para eventos",
    "5629 Otros servicios de comidas",
    "5811 Edición de libros",
    "5812 Edición de directorios y listas de correo",
    "5813 Edición de periódicos",
    "5814 Edición de revistas y otras publicaciones periódicas",
    "5820 Edición de programas de software",
    "5910 Actividades de producción cinematográfica y de vídeo",
    "5920 Actividades de grabación de sonido y edición de música",
    "6010 Actividades de radiodifusión",
    "6020 Actividades de telecomunicaciones",
    "6110 Actividades de telecomunicaciones fijas",
    "6120 Actividades de telecomunicaciones móviles",
    "6130 Actividades de telecomuniciones por satélite",
    "6190 Otras actividades de telecomunicaciones",
    "6201 Desarrollo de programas informáticos a medida",
    "6202 Servicios de consultoría en tecnología de la información",
    "6203 Gestión de instalaciones de tecnología de la información",
    "6209 Otros servicios relacionados con las tecnologías de la información",
    "6311 Procesamiento de datos, hosting y actividades relacionadas",
    "6312 Portales web",
    "6391 Actividades de agencias de noticias",
    "6399 Otros servicios de información n.c.p.",
    "6411 Servicios de banca comercial",
    "6412 Servicios de banca de inversión",
    "6420 Actividades de sociedades holding",
    "6430 Gestión de fondos y fideicomisos",
    "6491 Otros servicios financieros n.c.p.",
    "6492 Otros servicios financieros n.c.p.",
    "6511 Seguros de vida",
    "6512 Seguros distintos de los de vida",
    "6520 Reaseguro",
    "6530 Fondos de pensiones",
    "6611 Administración de mercados financieros",
    "6612 Actividades de intermediación en los mercados financieros",
    "6621 Actividades de agentes y corredores de seguros",
    "6622 Actividades de ajuste y liquidación de seguros",
    "6629 Otros servicios auxiliares a los seguros y a los fondos de pensiones",
    "6630 Gestión de fondos de pensiones",
    "6810 Compraventa de bienes inmobiliarios por cuenta propia",
    "6820 Alquiler de bienes inmobiliarios por cuenta propia",
    "6831 Agentes de la propiedad inmobiliaria",
    "6832 Administración de bienes inmobiliarios por cuenta de terceros",
    "6910 Actividades jurídicas",
    "6920 Actividades de contabilidad, teneduría de libros, auditoría y asesoría fiscal",
    "7010 Actividades de las sedes centrales; gestión de empresas",
    "7020 Servicios de consultoría de gestión empresarial",
    "7111 Servicios de arquitectura",
    "7112 Servicios de ingeniería técnica",
    "7120 Servicios de ensayos y análisis técnicos",
    "7210 Investigación y desarrollo experimental en biotecnología",
    "7220 Investigación y desarrollo experimental en ciencias físicas y naturales",
    "7311 Servicios de publicidad",
    "7312 Servicios de investigación de mercados y encuestas de opinión",
    "7320 Servicios de asesoramiento sobre seguridad y salud en el trabajo",
    "7410 Servicios de diseño especializado",
    "7420 Servicios de fotografía",
    "7490 Otros servicios profesionales, científicos y técnicos n.c.p.",
    "7500 Servicios veterinarios",
    "7710 Alquiler de automóviles y vehículos de motor ligeros",
    "7721 Alquiler de motocicletas y vehículos similares",
    "7722 Alquiler de bicicletas y vehículos similares",
    "7730 Alquiler de maquinaria y equipo para la construcción e ingeniería civil",
    "7740 Alquiler de maquinaria y equipo para la industria manufacturera",
    "7750 Alquiler de otros efectos personales y enseres domésticos",
    "7810 Actividades de agencias de colocación",
    "7820 Actividades de las agencias de colocación y de servicios de empleo",
    "7830 Actividades de los servicios de empleo",
    "7911 Actividades de agencias de viajes",
    "7912 Actividades de operadores turísticos",
    "7990 Otros servicios de reservas y actividades relacionadas",
    "8010 Servicios de seguridad privada",
    "8020 Servicios de protección y vigilancia",
    "8030 Servicios de investigación y seguridad",
    "8110 Servicios de limpieza general de edificios",
    "8121 Servicios de limpieza de edificios y locales",
    "8122 Servicios de limpieza de alfombras y tapicerías",
    "8123 Servicios de limpieza de fachadas y cristales",
    "8129 Otros servicios de limpieza",
    "8211 Servicios administrativos combinados",
    "8212 Servicios de apoyo a las funciones de oficina",
    "8220 Actividades de centros de llamadas",
    "8230 Organización de convenciones y ferias",
    "8291 Actividades de los centros de información",
    "8292 Actividades de empaquetado",
    "8299 Otros servicios de apoyo a las empresas n.c.p.",
    "8411 Servicios de la administración pública en general",
    "8412 Servicios de la administración pública en general",
    "8421 Servicios de la administración pública en general",
    "8422 Servicios de la administración pública en general",
    "8430 Actividades de las organizaciones empresariales y profesionales",
    "8511 Educación preescolar",
    "8512 Educación primaria",
    "8520 Educación secundaria",
    "8531 Educación superior universitaria",
    "8532 Educación superior no universitaria",
    "8541 Educación de adultos y otros tipos de educación no formal",
    "8551 Educación en el ámbito deportivo",
    "8552 Educación en el ámbito de las artes",
    "8553 Educación en el ámbito de la música",
    "8554 Educación en el ámbito de la danza",
    "8559 Otros tipos de educación",
    "8560 Actividades auxiliares a la educación",
    "8610 Actividades de hospitalización",
    "8621 Actividades de médicos generales",
    "8622 Actividades de médicos especialistas",
    "8623 Actividades de dentistas",
    "8690 Otros servicios de atención médica",
    "8710 Actividades de los hospitales",
    "8720 Actividades de atención médica ambulatoria",
    "8730 Actividades de cuidado de niños y adultos",
    "8740 Actividades de los servicios de atención a la tercera edad",
    "8810 Actividades de los servicios sociales sin alojamiento",
    "8891 Actividades de los servicios sociales con alojamiento",
    "8899 Otros servicios sociales",
    "9001 Artes escénicas",
    "9002 Actividades auxiliares a las artes escénicas",
    "9003 Actividades de apoyo a las artes escénicas",
    "9101 Gestión de museos",
    "9102 Gestión de espacios culturales",
    "9103 Gestión de jardines botánicos y zoológicos",
    "9200 Actividades de juegos de azar y apuestas",
    "9311 Gestión de instalaciones deportivas",
    "9312 Actividades de los centros de fitness",
    "9313 Actividades de los centros de deportes acuáticos",
    "9319 Otras actividades deportivas",
    "9321 Actividades de parques de atracciones y temáticos",
    "9329 Otras actividades recreativas y de entretenimiento",
    "9411 Actividades de organizaciones empresariales y profesionales",
    "9412 Actividades de asociaciones de defensa de los derechos de los consumidores",
    "9420 Actividades de asociaciones y organizaciones empresariales",
    "9491 Actividades de asociaciones de organizaciones empresariales y profesionales",
    "9492 Actividades de asociaciones de organizaciones empresariales y profesionales",
    "9511 Reparación de ordenadores y equipos periféricos",
    "9512 Reparación de equipos de telecomunicaciones",
    "9521 Reparación de aparatos electrodomésticos",
    "9522 Reparación de otros equipos domésticos",
    "9523 Reparación de otros equipos de oficina",
    "9524 Reparación de maquinaria y equipo industrial",
    "9601 Lavado y limpieza de prendas textiles y de piel",
    "9602 Peluquería y otros tratamientos de belleza",
    "9603 Servicios funerarios y de pompas fúnebres",
    "9604 Servicios de lavandería y tintorería",
    "9605 Otros servicios personales",
    "9701 Actividades de las casas particulares con servicio de personal",
    "9702 Actividades de las casas particulares sin servicio de personal",
    "9800 Actividades de las viviendas sin servicios de alojamiento",
    "9810 Servicios de jardinería y paisajismo",
    "9820 Actividades de los servicios de limpieza",
    "9830 Servicios de asesoramiento para el hogar",
    "9900 Actividades de las viviendas y de los edificios no residenciales",
    "9910 Actividades de las viviendas y de los edificios no residenciales",
    "9999 Actividades no clasificadas en otra parte"
  ];

  // Métodos para filtrar la lista de códigos CIIU
  filteredCodciuu!: Observable<string[]>; // Observable para las opciones filtradas
  industrySearchCtrl = new FormControl(); // Control para la búsqueda

  // Métodos para filtrar la lista de códigos Ciudad
  filteredCities!: Observable<string[]>; // Observable para las opciones filtradas
  citySearchCtrl = new FormControl(); // Control para la búsqueda

  cities: string[] = []; //

  constructor(private dialogRef: MatDialogRef<CreateCompanyComponent>) {}

  ngOnInit(): void {
    // Aquí instanciamos el FormGroup y definimos los controles
    this.createCompanyForm = this.formBuilder.group({
      companyName:                              ['', Validators.required],  
      companyDocumentType:                      ['', Validators.required], // Tipo de documento de la empresa (ej. NIT, Cédula Jurídica)
      companyDocumentNumber:                    ['', Validators.required], // Número de documento de la empresa
      companyCity:                              ['', Validators.required], // Ciudad de la empresa
      companyAddress:                           ['', Validators.required], // Dirección de la empresa
      companyPhoneNumber:                       [''], // Número de teléfono de la empresa
      companyEmail:                             ['', [Validators.required, Validators.email]], // Email de la empresa
      companyIndustry:                          ['', Validators.required], // Industria o sector de la empresa
      companyWebsite:                           [''], // Sitio web de la empresa (opcional)
      companyRepresentativeName:                ['', Validators.required], // Nombre del representante legal
      companyRepresentativeTypeDocument:        ['', Validators.required], // Nombre del representante legal
      companyRepresentativeDocumentNumber:      ['', Validators.required], // Nombre del representante legal
      companyRepresentativeEmail:               ['', [Validators.required,  Validators.email]], // Nombre del representante legal
      companyRepresentativePhoneNumber:         [''], // Nombre del representante legal
    });

    // Configuración del observable de filtrado
    this.filteredCodciuu = this.industrySearchCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterIndustry(value || ''))
    );
    
    this.citiesService.getCities().subscribe({
      next: (response: any[]) => {
        this.cities = response;
        console.log(this.cities);

        // Configuración del observable de filtrado
        this.filteredCities = this.citySearchCtrl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterCity(value || ''))
        );
        // this.spinner.hide();

        // if (appRoot) {
        //   appRoot.classList.add('blur-background'); // Añadir clase al app-root
        // }

        // if (response.statusCode === 200) {
        //   const title = 'Creacion Responsble';
        //   const message = response.message;
        //   this.toastr.showSucces(title, message);
        //   this.dialogRef.close({
        //     status: true,
        //     data: response
        //   });
        // }
      },
      error: err => {
        this.spinner.hide();

        // if (appRoot) {
        //   appRoot.classList.add('blur-background'); // Añadir clase al app-root
        // }

        // const title = 'Creacion Responsable';
        // const message = err.error.error;
        // this.toastr.showError(title, message);
      }
    })

    
  }

  filterIndustry(value: string): string[] {
    console.log('Valor ingresado para filtrar:', value); // Verificar el valor ingresado
    const filterValue = value.toLowerCase();
    const result = this.codciuu.filter(industry => industry.toLowerCase().includes(filterValue));
    console.log('Resultado del filtrado:', result); // Verificar el resultado del filtrado
    return result;
  }

  filterCity(value: string): string[] {
    console.log('Valor ingresado para filtrar:', value); // Verificar el valor ingresado
    const filterValue = value;
    const result = this.cities.filter(city => city.includes(filterValue));
    console.log('Resultado del filtrado:', result); // Verificar el resultado del filtrado
    return result;
  }

  closeDialog(): void {
    this.dialogRef.close({
      status: false,
      data: {}
    });
  }

  createCompany(): void {
    const appRoot = document.querySelector('app-root');
    if (appRoot) {
      appRoot.classList.remove('blur-background'); // Quitar clase del app-root
    }

    this.spinner.show();
    setTimeout(() => {
      if (appRoot) {
        appRoot.classList.remove('blur-background'); // Añadir clase al app-root
      }

      this.configurationService.createCompany(this.createCompanyForm.value).subscribe({
        next: (response: any) => {
          this.spinner.hide();

          if (appRoot) {
            appRoot.classList.add('blur-background'); // Añadir clase al app-root
          }

          if (response.statusCode === 200) {
            const title = 'Creacion Responsble';
            const message = response.message;
            this.toastr.showSucces(title, message);
            this.dialogRef.close({
              status: true,
              data: response
            });
          }
        },
        error: err => {
          this.spinner.hide();

          if (appRoot) {
            appRoot.classList.add('blur-background'); // Añadir clase al app-root
          }

          const title = 'Creacion Responsable';
          const message = err.error.error;
          this.toastr.showError(title, message);
        }
      })
    }, 
    1000
    );
  }
}
