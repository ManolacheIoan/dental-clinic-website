/** Echipa clinicii. Avatarele sunt ilustrații generate din parametrii de mai jos. */

export type AvatarLook = {
  skin: string;
  hair: string;
  style: "short" | "long" | "bun" | "curly" | "side";
  scrubs: string;
  bg: string;
  glasses?: boolean;
  beard?: boolean;
};

export type Member = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  /** Un detaliu simpatic, bun de spus copiilor. */
  fun: string;
  look: AvatarLook;
};

export const team: Member[] = [
  {
    name: "Dr. Andreea Pavel",
    role: "Medic stomatolog, pedodonție",
    focus: "Copii și prima vizită",
    bio: "Lucrează cu copii de peste 10 ani și transformă orice control într-o mică aventură. Crede că un copil care pleacă zâmbind va avea grijă de dinți toată viața.",
    fun: "Știe pe de rost numele tuturor celor 20 de dinți de lapte.",
    look: { skin: "#F4C7A5", hair: "#7A4B2A", style: "bun", scrubs: "#1AA6A6", bg: "#FFE7A3" },
  },
  {
    name: "Dr. Mihai Constantin",
    role: "Medic specialist ortodonție",
    focus: "Aparate dentare și gutiere",
    bio: "Pasionat de zâmbete aliniate și de planificarea digitală. Le explică pacienților fiecare etapă pe ecran, ca să știe mereu cât mai e până la final.",
    fun: "A purtat el însuși aparat dentar în liceu.",
    look: { skin: "#E8B48F", hair: "#2B2420", style: "short", scrubs: "#FF7A6B", bg: "#BFE7E4", glasses: true },
  },
  {
    name: "Dr. Irina Stoica",
    role: "Medic stomatolog, endodonție",
    focus: "Carii și tratamente de canal",
    bio: "Răbdătoare și meticuloasă, lucrează cu microscopul ca să salveze cât mai mult din dintele natural. Pacienții o știu pentru mâna ei ușoară.",
    fun: "Ascultă muzică clasică în timpul tratamentelor lungi.",
    look: { skin: "#C98E6A", hair: "#3A2418", style: "curly", scrubs: "#FFC93C", bg: "#FFD3CB" },
  },
  {
    name: "Dr. Radu Neagu",
    role: "Medic specialist chirurgie dento-alveolară",
    focus: "Implanturi și extracții",
    bio: "Planifică fiecare implant cu tomografie 3D și preferă intervențiile scurte și bine pregătite. Calm, precis și mereu disponibil pentru întrebări după intervenție.",
    fun: "Aleargă la crosul de pe faleza Dunării în fiecare toamnă.",
    look: { skin: "#F1C29B", hair: "#8A8F94", style: "side", scrubs: "#1AA6A6", bg: "#FFE7A3", beard: true },
  },
  {
    name: "Elena Munteanu",
    role: "Asistentă medicală, igienist dentar",
    focus: "Igienizări și educație",
    bio: "Face igienizările cu blândețe și le arată tuturor, mari și mici, cum se folosește corect ața dentară. Are mereu un sfat bun pentru acasă.",
    fun: "Are o colecție de periuțe de dinți din toate țările vizitate.",
    look: { skin: "#F4C7A5", hair: "#C9853A", style: "long", scrubs: "#FF7A6B", bg: "#BFE7E4" },
  },
  {
    name: "Cristina Dobre",
    role: "Recepție și programări",
    focus: "Programări și primirea pacienților",
    bio: "Prima voce pe care o auzi la telefon. Găsește ora potrivită chiar și în săptămânile aglomerate și le pregătește copiilor stickere la plecare.",
    fun: "Desenează personajele de pe diplomele de curaj.",
    look: { skin: "#E8B48F", hair: "#1F1A17", style: "long", scrubs: "#FFC93C", bg: "#FFD3CB", glasses: true },
  },
];
