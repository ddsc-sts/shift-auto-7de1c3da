import corolla from "@/assets/car-corolla.jpg";
import compass from "@/assets/car-compass.jpg";
import golf from "@/assets/car-golf.jpg";

export type VehicleStatus = "maintenance" | "healthy" | "archived";

export type Component3D = {
  id: string;
  name: string;
  // normalized position on the car: x (-1 left..1 right), y (0 floor..1 roof), z (-1 rear..1 front)
  pos: [number, number, number];
  service: string;
  oldPart?: string;
  newPart?: string;
  date: string;
  order: string;
  mechanic: string;
  state: "done" | "progress" | "planned";
};

export type Vehicle = {
  id: string;
  name: string;
  version: string;
  plate: string;
  year: number;
  km: number;
  health: number;
  battery: string;
  status: VehicleStatus;
  location: string;
  image: string;
  model: string;
  color: string;
  nextService: string;
  activeOrder?: { id: string; title: string; progress: number; eta: string; box: string };
  components: Component3D[];
};

export const user = {
  name: "Carlos Eduardo Silva",
  first: "Carlos",
  city: "Joinville · SC",
  email: "carlos.silva@email.com",
  phone: "+55 (47) 99123-4567",
  since: "Jun/2023",
  shop: "Shift Auto · Matriz Joinville",
};

export const vehicles: Vehicle[] = [
  {
    id: "corolla",
    name: "Toyota Corolla 2020",
    version: "2.0 Dual VVT-iE · Sedã · Flex",
    plate: "RIO-9A82",
    year: 2020,
    km: 62450,
    health: 92,
    battery: "12,6 V",
    status: "maintenance",
    location: "Box 01 · Elevador hidráulico",
    image: corolla,
    model: "/models/sedan.glb",
    color: "#c9ccd1",
    nextService: "Em 2.450 km",
    activeOrder: {
      id: "#1048",
      title: "Substituição das pastilhas de freio dianteiras",
      progress: 75,
      eta: "Hoje, 17:30",
      box: "Box 01",
    },
    components: [
      {
        id: "brake-fl",
        name: "Freio dianteiro esquerdo",
        pos: [-1, 0.3, 0.62],
        service: "Substituição de pastilhas",
        oldPart: "Pastilha com desgaste · 1,8 mm",
        newPart: "Pastilha Bosch QuietCast",
        date: "16/10/2026",
        order: "#1048",
        mechanic: "André Freios",
        state: "progress",
      },
      {
        id: "engine",
        name: "Motor · Lubrificação",
        pos: [0, 0.62, 0.72],
        service: "Troca de óleo e filtro",
        oldPart: "Óleo 5W30 · 10.000 km",
        newPart: "Óleo sintético 5W30 + filtro original",
        date: "10/11/2025",
        order: "#0911",
        mechanic: "Lucas Silveira",
        state: "done",
      },
      {
        id: "susp-rr",
        name: "Suspensão traseira direita",
        pos: [1, 0.35, -0.6],
        service: "Inspeção de amortecedores",
        date: "05/08/2027",
        order: "Planejado",
        mechanic: "—",
        state: "planned",
      },
    ],
  },
  {
    id: "compass",
    name: "Jeep Compass 2023",
    version: "Limited T270 Turbo · SUV",
    plate: "BRA-2E19",
    year: 2023,
    km: 18200,
    health: 99,
    battery: "12,8 V",
    status: "healthy",
    location: "Garagem residencial",
    image: compass,
    model: "/models/suv.glb",
    color: "#1f3a6b",
    nextService: "Revisão 20.000 km",
    components: [
      {
        id: "engine",
        name: "Motor · Filtros",
        pos: [0, 0.62, 0.72],
        service: "Revisão de 10.000 km",
        newPart: "Óleo Mopar MaxPro 5W30 + filtros",
        date: "18/11/2025",
        order: "#0932",
        mechanic: "Marcos Vinicius",
        state: "done",
      },
      {
        id: "wheels",
        name: "Alinhamento e balanceamento",
        pos: [1, 0.3, 0.6],
        service: "Alinhamento 3D a laser",
        date: "18/11/2025",
        order: "#0932",
        mechanic: "Marcos Vinicius",
        state: "done",
      },
    ],
  },
  {
    id: "golf",
    name: "VW Golf TSI 1.4",
    version: "Highline · Hatch",
    plate: "SPX-7F33",
    year: 2017,
    km: 84200,
    health: 88,
    battery: "12,4 V",
    status: "archived",
    location: "Vendido · histórico guardado",
    image: golf,
    model: "/models/hatchback-sports.glb",
    color: "#f2f2f2",
    nextService: "—",
    components: [
      {
        id: "belt",
        name: "Correia dentada",
        pos: [0.4, 0.55, 0.75],
        service: "Kit correia + bomba d'água",
        newPart: "Correia Gates PowerGrip",
        date: "24/10/2025",
        order: "#0887",
        mechanic: "Carlos Eduardo",
        state: "done",
      },
    ],
  },
];

export const history = [
  {
    date: "16 Out 2026",
    vehicle: "Toyota Corolla 2020",
    plate: "RIO-9A82",
    km: 62450,
    title: "Troca das pastilhas de freio dianteiras",
    why: "As pastilhas atingiram 1,8 mm (limite de segurança: 3 mm). A troca evita danos ao disco e garante frenagem firme.",
    parts: ["Pastilhas Bosch Ceramic (12 mm)", "Fluido sintético DOT 5.1"],
    mechanic: "André Freios",
    value: 1250,
    status: "progress" as const,
  },
  {
    date: "18 Nov 2025",
    vehicle: "Jeep Compass 2023",
    plate: "BRA-2E19",
    km: 10150,
    title: "Revisão periódica de 10.000 km",
    why: "Manutenção preventiva obrigatória para manter a garantia de fábrica do motor turbo.",
    parts: ["Óleo Mopar MaxPro 5W30", "Filtro de óleo + ar condicionado", "Alinhamento 3D"],
    mechanic: "Marcos Vinicius",
    value: 980,
    status: "done" as const,
  },
  {
    date: "10 Nov 2025",
    vehicle: "Toyota Corolla 2020",
    plate: "RIO-9A82",
    km: 52100,
    title: "Troca de óleo e higienização de cabine",
    why: "Óleo vencido por tempo (6 meses). Higienização elimina fungos do ar-condicionado.",
    parts: ["Óleo Toyota 5W30 (4,2 L)", "Filtro Mann Filter"],
    mechanic: "Lucas Silveira",
    value: 560,
    status: "done" as const,
  },
  {
    date: "24 Out 2025",
    vehicle: "VW Golf TSI 1.4",
    plate: "SPX-7F33",
    km: 80000,
    title: "Kit de correia dentada e bomba d'água",
    why: "Troca preventiva por quilometragem para evitar quebra do motor.",
    parts: ["Correia Gates PowerGrip", "Bomba d'água original"],
    mechanic: "Carlos Eduardo",
    value: 3840,
    status: "done" as const,
  },
];

export const appointments = [
  { id: "A-2041", vehicle: "Jeep Compass 2023", plate: "BRA-2E19", date: "28 Nov", time: "08:30", service: "Revisão de 20.000 km", place: "Matriz Joinville", status: "confirmed" as const },
  { id: "A-2052", vehicle: "Toyota Corolla 2020", plate: "RIO-9A82", date: "12 Dez", time: "14:00", service: "Inspeção de fluidos e freios", place: "Matriz Joinville", status: "pending" as const },
];

export const payments = [
  { id: "#1048", vehicle: "Toyota Corolla 2020", desc: "Pastilhas + fluido de freio", date: "16/10/2026", value: 1250, status: "open" as const },
  { id: "#0932", vehicle: "Jeep Compass 2023", desc: "Revisão 10.000 km", date: "18/11/2025", value: 980, status: "paid" as const },
  { id: "#0911", vehicle: "Toyota Corolla 2020", desc: "Troca de óleo e higienização", date: "10/11/2025", value: 560, status: "paid" as const },
  { id: "#0887", vehicle: "VW Golf TSI 1.4", desc: "Kit correia dentada", date: "24/10/2025", value: 3840, status: "paid" as const },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const km = (v: number) => `${v.toLocaleString("pt-BR")} km`;
