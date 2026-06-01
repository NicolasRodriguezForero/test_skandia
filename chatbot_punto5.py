"""
Punto 5 - Chatbot por reglas para explicar a NIXOS que es un forward
y por que sirve de cobertura. Version de consola.

Es un chatbot "rule-based": las respuestas estan escritas de antemano y se
eligen por un menu. Asi el contenido es siempre correcto y apropiado para ninos,
y funciona sin internet.
"""

GUION = {
    "1": (
        "Un forward es una PROMESA. \U0001F91D\n"
        "Imagina que hoy haces un trato con un amigo:\n"
        "  'El proximo mes te compro tu figura de dinosaurio, y desde YA\n"
        "   acordamos el precio: 3 monedas.'\n"
        "Pase lo que pase, el proximo mes la cambias por 3 monedas. Aunque\n"
        "todos quieran ese dinosaurio y suba a 10 monedas, tu pagas 3, porque\n"
        "lo prometieron antes.\n"
        "¡Eso es un forward: un trato HOY para intercambiar algo DESPUES,\n"
        "a un precio fijado desde ahora! ⏰"
    ),
    "2": (
        "Cobertura es una palabra elegante para decir PROTECCION. \U0001F6E1️\n"
        "Es como llevar paraguas cuando no sabes si va a llover, o ponerte\n"
        "casco para montar bici. ¡No es que quieras caerte... es para estar\n"
        "seguro por si acaso!\n"
        "Un forward te protege de que un precio cambie de golpe. Tu ya sabes\n"
        "HOY cuanto vas a pagar (o recibir) manana, asi que ninguna sorpresa\n"
        "te puede hacer dano. \U0001F60E"
    ),
    "3": (
        "¡Vamos con helados! \U0001F366\n"
        "Hoy un helado cuesta 1 moneda. Pero quieres comprar uno el proximo\n"
        "mes... y te da miedo que suba a 2 monedas. \U0001F631\n"
        "Entonces haces un trato con el heladero:\n"
        "  'Te prometo que el proximo mes te compro un helado, y tu me\n"
        "   prometes vendermelo a 1 moneda.' \U0001F91D\n"
        "El proximo mes:\n"
        "  - Si el helado subio a 2 monedas -> ¡pagas solo 1! Ganaste. \U0001F389\n"
        "  - Si bajo, pagas 1, pero estuviste TRANQUILO todo el mes.\n"
        "Esa promesa es un forward, y te sirvio de COBERTURA: te protegio\n"
        "del susto del precio. \U0001F6E1️"
    ),
    "4": (
        "Las empresas grandes hacen lo mismo, pero con DOLARES en vez de\n"
        "helados. \U0001F4B5\n"
        "Una empresa sabe que el proximo ano va a recibir muchos dolares,\n"
        "pero no sabe cuanto valdran en pesos. \U0001F914\n"
        "Para no llevarse un susto, hace un forward: deja fijado HOY a que\n"
        "precio cambiara esos dolares. Asi planea tranquila, suba o baje el\n"
        "dolar. ¡Es la misma promesa del helado, pero en grande! \U0001F3E2"
    ),
}

BIENVENIDA = (
    "\n\U0001F98A ¡Hola! Soy Forwy, el zorrito del dinero.\n"
    "Te voy a ensenar un truco que usan los grandes para no llevarse\n"
    "sorpresas con los precios. ¿Que quieres saber?\n"
)

MENU = (
    "\n--------------------------------------------\n"
    "  1) ¿Que es un forward?\n"
    "  2) ¿Que es una cobertura (proteccion)?\n"
    "  3) Un ejemplo con helados \U0001F366\n"
    "  4) ¿Por que lo usan las empresas?\n"
    "  5) Adios \U0001F44B\n"
    "--------------------------------------------\n"
    "Escribe un numero (1-5): "
)

DESPEDIDA = (
    "\n\U0001F31F ¡Lo hiciste genial! Ahora ya sabes que un forward es una\n"
    "PROMESA de precio para el futuro, y que sirve de COBERTURA porque te\n"
    "PROTEGE de las sorpresas. ¡Hasta pronto! \U0001F98A\U0001F44B\n"
)


def main():
    print(BIENVENIDA)
    while True:
        opcion = input(MENU).strip()
        if opcion == "5":
            print(DESPEDIDA)
            break
        respuesta = GUION.get(opcion)
        if respuesta:
            print("\n\U0001F98A Forwy dice:\n" + respuesta)
        else:
            print("\nMmm, no entendi. \U0001F914 Elige un numero del 1 al 5, ¡porfa!")


if __name__ == "__main__":
    main()
