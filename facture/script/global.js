var items = [];
var invoiceInformation = [];
$(document).ready(function(){

	if( localStorage["items"] && localStorage["items"] != undefined && localStorage["items"] != "undefined" ){			
		items = JSON.parse(localStorage["items"]);
	}

	$.each(items, function(index, item){
		$(".content").append("<div class='item-facture roll-input'>"+"<div class='delete-item'><p>x</p></div>"+"<div class='item'>"+"<div class='part-item'><p class='first-p'>Description item:</p><input class='description-item' type='text' name='description-item'></div>"+"<div class='part-item'><p>Amount:</p><input class='cant-item' type='number' name='description-item'></div>"+"<div class='part-item'><p>Unit price:</p><input class='precio-item' type='number' name='description-item'></div>"+"<div class='part-item'><p>Total:</p><input class='total-item' type='number' name='description-item'></div>"+"</div>"+"</div>");
	});

	$(".number-facture").unbind().blur(function(){
		var numberFacture = $(this).val();
		console.log(numberFacture)
	});

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