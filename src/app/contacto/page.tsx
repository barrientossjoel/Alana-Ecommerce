import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactoPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="max-w-3xl mx-auto px-8 py-24">
                <h1 className="text-3xl font-medium text-foreground tracking-wide mb-4 text-center">Contacto</h1>
                <p className="text-muted-foreground text-sm tracking-wide text-center mb-12">
                    Dejanos tu consulta y te responderemos a la brevedad.
                </p>

                <form className="bg-card border border-border p-8 flex flex-col gap-6 shadow-md" action={async (formData) => {
                    "use server";
                    // Mock submission for now
                    console.log(formData);
                }}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Nombre</label>
                        <Input id="name" name="name" required className="bg-background border-border text-foreground h-12" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Email</label>
                        <Input id="email" name="email" type="email" required className="bg-background border-border text-foreground h-12" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            className="w-full bg-background border border-border rounded-md text-foreground p-4 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                        />
                    </div>

                    <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 mt-4 text-xs font-semibold tracking-widest uppercase">
                        Enviar Mensaje
                    </Button>
                </form>
            </main>
        </div>
    );
}
