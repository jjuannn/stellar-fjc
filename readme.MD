https://www.stellar.org/learn/intro-to-stellar
Stellar es un protocolo descentralizado para transferencias de moneda digital.
Stellar es una red de código abierto para monedas y pagos.
Stellar hace posible crear, enviar e intercambiar representaciones digitales de todas las formas de dinero: dólares, pesos, bitcoins, prácticamente cualquier cosa.
Está diseñado para que todos los sistemas financieros del mundo puedan trabajar juntos en una sola red.

Stellar no tiene dueño; en todo caso es propiedad del público. El software se ejecuta en una red descentralizada y abierta que maneja millones de transacciones cada día. Al igual que Bitcoin y Ethereum, Stellar depende de su blockchain para mantener la red sincronizada,
pero la experiencia del usuario final es más como efectivo:
Stellar es mucho más rápido, más barato y más eficiente en energía que los sistemas típicos basados en blockchain.

Moneda de Stellar => Lumen (XLM)

Stellar le permite a un usuario crear una representación canjeable y comercializable de cualquier activo. Tales representaciones se llaman tokens. Los tokens son más útiles cuando están vinculados a monedas (representando dólares, yuan o euros digitalmente de tal manera que los pagos son instantáneos y sin fronteras) pero en teoría, en Stellar, podrías emitir un token para bushels de maíz, oro, acciones de un REIT o una hora de tu tiempo como consultor. En cierto sentido, Stellar ofrece un conjunto de herramientas generalizadas para que cualquiera pueda hacer lo que Tether hizo por el dólar con su USDT, o lo que Coinbase está haciendo con su USDC . Stellar le permite digitalizar el valor y luego emitir y canjear reclamos sobre él; la plataforma fue diseñada para monedas estables antes de que existiera el término.

Cada token en Stellar es intercambiable con cualquier otro token en la red, y el protocolo de Stellar en sí mismo conecta compradores y vendedores. Los usuarios pueden enviar sus ofertas o solicitudes a la red pública a través de una operación simple, y cada pocos segundos las transacciones compatibles se resolverán automáticamente. Ningún intermediario organiza un acuerdo y ninguna entidad actúa como custodio intermedio. En resumen, hay un exchange descentralizado (también conocido como DEX ) integrado en el sistema de Stellar.

Entre las principales cadenas de bloques, Stellar es único en este sentido. El protocolo Stellar de base no solo rastrea los saldos (como lo hacen Bitcoin o Ethereum), sino que también rastrea y resuelve los intercambios entre saldos de una manera descentralizada y sin propietario.

Como puede ver, Stellar se ve y actúa como las plataformas de trading tradicionales: puedes ver las órdenes abiertas, el historial de trades y la profundidad del mercado, pero todas estas ofertas se vinculan directamente con las cuentas Stellar on-chain. No estás confiando en un exchange para mantener tus activos, ni dependes de ellos para liquidar sus operaciones. Tienes tus propios activos. Tú tienes el control. Y la red garantiza la liquidación.

Al igual que cualquier sistema de pagos, Stellar permite a un usuario enviar monedas a otro usuario. El usuario A puede enviar al usuario B tokens de dólar o lumens o lo que el usuario quiera. Pero Stellar también permite que un usuario envíe una moneda y que el destinatario reciba otra . Esencialmente, puede enviar e intercambiar dinero en una sola transacción atómica.

Esto se llama una ruta de pago . Es una innovación poderosa para pagos internacionales; Por ejemplo, una empresa estadounidense puede pagar una factura en México gastando tokens en dólares, mientras que el proveedor recibe tokens en pesos. Ninguna de las partes incurren en el riesgo de tipo de cambio o demoras. Ambas partes obtienen solo la moneda que desean.

Para facilitar la transferencia de valor del sistema bancario tradicional a Stellar y viceversa, la red confía en anclas, que son instituciones financieras reguladas,
empresas de servicios monetarios o empresas fintech que ofrecen uno,
o ambos, de los siguientes servicios componentes:
Emitir tokens fiduciarios: Emitir tokens uno a uno con respaldo fiduciario (también conocidos como stablecoins) y mantener reservas fiduciarias equivalentes al valor de los tokens emitidos para que los usuarios puedan canjearlos nuevamente por fiat en cualquier momento;
y
Proporcionar una rampa de entrada / salida a fiat: Conecta la red de Stellar al sistema bancario del país ancla manteniendo un servicio que maneje procesos regulatorios como KYC / AML y permita a los usuarios realizar depósitos y retiros sin problemas.

https://www.lumenauts.com/lessons/what-is-stellar
Cuenta:

- Balances, transacciones, emision de activos (issue assets).
- Tienen una secret y una private key (keyvalue pair).
  - Privada: una especie de contraseña para tu cuenta.
  - Publica: identifica tu cuenta en transacciones, etc.
- Assets, trades, trustlines.

Ledger:

- Fuente de la verdad.
- Contiene las transacciones, la informacion y el balance de las cuentas.
- Tiene las ordenes del exchange descentralizado.

Assets:

- ¿Plata? USD, BTC, EUR, ARS.
- Se holdea, se tradea, o se transfiere.
  - Lumen es la asset de Stellar, y puede funcionar como puente entre assets.
  - Non anchored assets => Generados en la network y no representan nada fuera de ella
  - Anchored assets => Si un asset no se origina en Stellar, se anchorea a la red por un
    anchoring entity, o un anchor (aka collaretalized, redeemable, tethered.)
- Un anchor actua como puente entre currencies en la red Stellar.
  - Se puede pensar como un banco que toma tu plata y te ponen ese balance en la cuenta de tu banco
    como un IOU (i owe you - yo te debo).
  - Un anchor toma tu plata, emite el credito correspondiente a la direccion de tu cuenta en el ledger.
- Un anchored asset puede ser cualquier cosa.
  - Dinero FIAT (USD, EUR).
  - Crypto (BTC, ETH).
  - Stocks.
  - Bonds.
  - Gold.
  - Real State.

Trustline:

- Emitis un trustline a ese anchor account.
- Solo deberias hacerlos con trustlines que confies.
- Paras holdear activos con un anchor, debemos emitir un trustline de tu cuenta a la de
  ese anchor. Este trustline tambien permite controlar QUE recibimos.

Nodos:

- Guardan una copia del global ledger y todos juntos conforman la red de stellar.
- Un nodo es una computadora normal que corre una instancia de Stellar Core.
- 2 tipos =>
  - Watchers => Monitorean la red.
    => Realizan transacciones.
    => Almacenan el ledger.
  - Validators => Participan en el consensus (acuerdan las transacciones cada X segundos).
    => Algo parecido a los bitcoins miners.
    => Escriben y updatean el global ledger.
- Cada nodo tiene una copia del ledger.

Stellar => 3 Layer protocol

- Anchors => Le das a Stellar anchor assets (activos ancla) y los
  tokeniza en la red stellar.
- Decentralized Exchange => Permite cambiar un token por otro
  mediante un libro de ordenes en el propio ledger.
- Consensus => Los nodos validators de la red deciden que transacciones aprobar
  y escribir en el ledger.

Multiple signature accounts:

- Requerir muchas secrets keys / seeds para autorizar una transaccion.

Transacciones:

- Cada transaccion debe ser firmada por el secret key, asociado al public key de la cuenta.
- En cada ronda del consensus, los nodos chequean la firma en cada transaccion para ver que este
  firmado antes de incluirlo en el ledger.

Wallets:

- Permiten acceder a nuestra cuenta.
- Podemos realizar transacciones y ver nuestros datos.
- NO almacenan tu plata, sino tu secret key y realizan las transacciones con ella.
- Es recomendable separar tus assets en varias wallets.

COLD - HOT Wallet:

- Cold wallet =>

  - Mas seguro
  - Menos facil de acceder
  - Ejemplo: tu secret key anotada en un papel, o una hardware wallet que no se conecta a internet.
  - Se deberia usar para mantener la mayoria de tus assets.

- Hot wallet =>
  - Menos seguro
  - Mas accessible.
  - Ejemplo: una app del celular, una app del pc, un password manager.
  - Solo se deberia tener aca los assets que estarias dispuesto a perder.
  - Esta conectada a internet.

Stellar Federation Protocols:

- Resuelve las Stellar Adresses en Stellar Keys mas faciles de leer.
- Ejemplo =>
  - Public Key = A1B2C3D4E5F6G7H8I9J10K11L
  - Stellar Address => john\*domain.com
- Como los alias de los bancos.
