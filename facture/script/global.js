var items = [];
var invoiceInformation = [];
var informationItems = [];
$(document).ready(function(){

	if( localStorage["informationItems"] && localStorage["informationItems"] != undefined && localStorage["informationItems"] != "undefined" ){			
		informationItems = JSON.parse(localStorage["informationItems"]);
	}

	$.each(informationItems, function(index, item){
		$(".part-item").each(function(index, item){
			$(this).children(".description-item").val(item.descriptioni);
			$(this).children(".cant-item").val(item.amount);
			$(this).children(".precio-item").val(item.unit);
			$(this).children(".total-item").val(item.total);
		});
	});

	$(".save").click(function(){
		$(".part-item").each(function(index, item){
			var index = informationItems.length;
			var descriptionItem = $(this).children(".description-item").val();
			var amountItem = $(this).children(".cant-item").val();
			var unitPriceItem = $(this).children(".precio-item").val();
			var totalItem = $(this).children(".total-item").val();
			informationItems.push({descriptioni: descriptionItem, amount: amountItem, unit: unitPriceItem, total: totalItem, index: index});
			localStorage["informationItems"] =  JSON.stringify(informationItems);
			// console.log(informationItems);
			// console.log(descriptionItem);
			// console.log(amountItem);
			// console.log(unitPriceItem);
			// console.log(totalItem);
		});
	});

	// save the information and display the invoice to refresh the page.
	if( localStorage["invoiceInformation"] && localStorage["invoiceInformation"] != undefined && localStorage["invoiceInformation"] != "undefined" ){			
		invoiceInformation = JSON.parse(localStorage["invoiceInformation"]);
	}

	$.each(invoiceInformation, function(index, item){
		$(".number-facture").val(item.number);
		$("#description-facture").val(item.description);
		$(".date-facture").val(item.date);
	});

	$(".date-facture, #description-facture, .number-facture").unbind().change(function(event){
		var numberFacture = $(".number-facture").val();
		var nameDescriptionOfFacture = $("#description-facture").val();
		var dateOfFacture = $(".date-facture").val();
		invoiceInformation.push({number: numberFacture, description: nameDescriptionOfFacture, date: dateOfFacture});
		localStorage["invoiceInformation"] =  JSON.stringify(invoiceInformation);
	});

	// traverse the array items and display items added.
	if( localStorage["items"] && localStorage["items"] != undefined && localStorage["items"] != "undefined" ){			
		items = JSON.parse(localStorage["items"]);
	}

	$.each(items, function(index, item){
		$(".content").append("<div class='item-facture roll-input'>"+"<div class='delete-item'><p>x</p></div>"+"<div class='item'>"+"<div class='part-item'><p class='first-p'>Description item:</p><input class='description-item' type='text' name='description-item'></div>"+"<div class='part-item'><p>Amount:</p><input class='cant-item' type='number' name='description-item'></div>"+"<div class='part-item'><p>Unit price:</p><input class='precio-item' type='number' name='description-item'></div>"+"<div class='part-item'><p>Total:</p><input class='total-item' type='number' name='description-item'></div>"+"</div>"+"</div>");
	});

	// add items to the invoice.
	$(".add-item").click(function(){
		$(".content").append("<div class='item-facture roll-input'>"+"<div class='delete-item'><p>x</p></div>"+"<div class='item'>"+"<div class='part-item'><p class='first-p'>Description item:</p><input class='description-item' type='text' name='description-item'></div>"+"<div class='part-item'><p>Amount:</p><input class='cant-item' type='number' name='description-item'></div>"+"<div class='part-item'><p>Unit price:</p><input class='precio-item' type='number' name='description-item'></div>"+"<div class='part-item'><p>Total:</p><input class='total-item' type='number' name='description-item'></div>"+"</div>"+"</div>");
		items.push({});
		localStorage["items"] =  JSON.stringify(items);

		calcTotalItem();
		deleteItem();
	});

	calcTotalItem();
	deleteItem();
});

var deleteItem = function(){
	$(".delete-item").click(function(){
		$(this).parents(".item-facture").remove();
	});
}

var calcTotalItem = function(){
	$(".cant-item,.precio-item").unbind().change(function(event){
		var value = $(this).val();
		var isCant = $(this).hasClass("cant-item");
		
		var parentContainer = $(this).parents(".item-facture");
		var otherValue = isCant ? parentContainer.find(".precio-item").val() : parentContainer.find(".cant-item").val();
		
		//TODO: VALIDATIONS!
		var lineTotal = otherValue * value;
		parentContainer.find(".total-item").val(lineTotal);

		var generalTotal = 0;
		$.each($(".total-item"), function(index, element){
 			generalTotal += parseInt($(element).val());
		});

		$("#total-facture").val(generalTotal);
	})
	// $(".cant-item").unbind().blur(function(){
	// 	var valCantidad = $(this).val();
	// 	var unitPrice = $(this).parents(".part-item").siblings(".part-item").children(".precio-item").val();
	// 	var valueTotal = $(".total-item").val();
	// 	if(valCantidad == undefined || valCantidad == 0 && unitPrice == undefined|| unitPrice == 0){
	// 		$(this).parents(".part-item").siblings(".part-item").children(".total-item").val(valueTotal*0);	
	// 	}else if(valCantidad != 0 && unitPrice == undefined || unitPrice == 0){
	// 		$(this).parents(".part-item").siblings(".part-item").children(".total-item").val(valCantidad);		
	// 	}else if(valCantidad != 0 && unitPrice != 0){
	// 		$(this).parents(".part-item").siblings(".part-item").children(".total-item").val(valCantidad*unitPrice);	
	// 	}
	// });

	// $(".precio-item").unbind().blur(function(){
 // 		var valPrecioUnitario = $(this).val();
 // 		var amount = $(this).parents(".part-item").siblings(".part-item").children(".cant-item").val();
 // 		var valueTotal = $(".total-item").val();
 // 		if(valPrecioUnitario == undefined || valPrecioUnitario == 0 && amount == undefined|| amount == 0){
	// 		$(this).parents(".part-item").siblings(".part-item").children(".total-item").val(valueTotal*0);	
	// 	}else if(valPrecioUnitario != 0 && amount == undefined || amount == 0){
	// 		$(this).parents(".part-item").siblings(".part-item").children(".total-item").val(valCantidad);		
	// 	}else if(valPrecioUnitario != 0 && amount != 0){
	// 		$(this).parents(".part-item").siblings(".part-item").children(".total-item").val(valPrecioUnitario*amount);	
	// 	}
	// });
}