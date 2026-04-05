export default function Footer() {
    return (
        <footer className="bg-card text-card-foreground p-8 border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                <div className="flex flex-col gap-2">
                    <span className="text-4xl leading-none mb-2 text-primary" style={{ fontFamily: "var(--font-script)" }}>Alana</span>
                    <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                        Somos de <strong className="text-foreground">Avellaneda</strong> y tenemos puntos de encuentro para retiro: de lunes a sábados en Dock Sud, Plaza Alsina, Coto Sarandí, Mitre y las Flores, Parque Lezama, y Plaza de Mayo (horarios a convenir).
                    </p>
                </div>

                <div className="flex gap-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    <a href="/productos" className="hover:text-foreground transition-colors">Productos</a>
                    <span className="text-border">|</span>
                    <a href="/contacto" className="hover:text-foreground transition-colors">Contacto</a>
                </div>
            </div>
            <div className="text-center text-muted-foreground text-xs mt-8 font-light">
                © {new Date().getFullYear()} Alana Indumentaria. Todos los derechos reservados.
            </div>
        </footer>
    );
}
