// partially taken from
// https://gir.st/blog/amazon-shipping.htm

var NOSHIP = /<span.*(Questo articolo non può essere consegnato in|Aucun vendeur ne peut exp|>Dieser Artikel kann nicht nach <|Dieser Artikel kann nicht in |El vendedor que has elegido para este producto no realiza|special handling and doesn't ship to your location|special handling and don't ship to your location|special handling and dont ship to your location|Questo prodotto non può essere spedito in|Nessun venditore spedisce attualmente questo prodotto in|Ce vendeur ne peut pas expédier l’article sélectionné en|Este producto no puede ser enviado a|Cet article ne peut pas être expédié en|Cet article ne peut pas être livré à l’adresse sélectionnée.|venditore selezionato per questo prodotto non spedisce|Lo sentimos, no podemos enviar este producto|Kein Verkäufer liefert diesen Artikel aktuell nac|Dieser Verkäufer liefert den von Ihnen gewählten Artikel nicht nach|Siamo spiacenti, ma questo venditore non consegna in|este vendedor no envía a|ce vendeur ne livre pas|Leider kann dieser Artikel nicht|Please check other sellers who may ship internationally|いてこの出品者は海外への配送に対応しておりません|This item does not ship to|Seller doesn’t deliver to|No sellers are currently delivering|seller does not deliver to|Leider versendet dieser|we can not deliver this item|we can't deliver this item).*/i;
var NOSTOCK = /<span.*(No disponible temporal|We do not know When or if this item will be back in stock|Temporarily out of stock.|ただいま在庫はありません|Derzeit nicht auf Lager).*/i;

function getContents(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});
}

let results = document.querySelectorAll(".s-result-list > div")
console.log(results.length)
results.forEach(result => 
{ 
	let anchor = result.querySelector("a")
	
	if (anchor !=  undefined)
	{
		getContents(anchor.href).then(content => 
		{

			console.log(content)
			if (content.match(NOSTOCK) || content.match(NOSHIP))
			{
				console.log("got it")

				result.style.opacity = .5
			}
		});
	}
})
