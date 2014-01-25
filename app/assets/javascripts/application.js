// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.mask
//= require turbolinks

$(document).ready(function(){
   $('.money').mask('000.00', {reverse: true});

   $("#all-products").click(function() {
       var checkStatus = $("#all-products").is(':checked');
       $(".product-checkbox").attr("checked", false);
       if(checkStatus) {
           $(".product-checkbox").click();
       }
   });
   
   multipleRemoveSelected = function() {
      var selected = [];
       $(".product-checkbox:checked").each(function(){
           selected.push($(this).attr("id"));
       });
       if(selected.length == 0) {
           alert("Select one or more products");
           return;
       } 
       removeSelected(selected);
   };

   removeSelected = function(selected) {
       if(confirm("Are you sure?")) {
           $.ajax({
               type:"POST",
               url: "/products/destroy_selected",
               data: {"selected" : selected},
               success: function(response) {
                   for(var i = 0; i < selected.length; i++) {
                       $("#" + selected[i]).parent().parent().remove();
                   }
                   var letter = selected.length == 1 ? "Product" : "Products";
                   alert(letter + " was successfully removed.");
               }
           });
       }
   };
  multipleActivateSelected = function() {
      var selected = [];
       $(".product-checkbox:checked").each(function(){
           selected.push($(this).attr("id"));
       });
       if(selected.length == 0) {
           alert("Select one or more products");
           return;
       }
       activateSelected(selected);
  };
   activateSelected = function(selected) {
       if(confirm("Are you sure?")) {
           $.ajax({
               type:"POST",
               url: "/products/activate_selected",
               data: {"selected" : selected},
               success: function(response) {
                   for(var i = 0; i < selected.length; i++) {
                       $("#" + selected[i]).parent().parent().addClass("active");
                       $("#" + selected[i]).parent().parent().find(".activate-link").hide();
                       $("#" + selected[i]).parent().parent().find(".deactivate-link").show();
                   }
               }
           });
       }
   };

  multipleDeactivateSelected = function() {
      var selected = [];
       $(".product-checkbox:checked").each(function(){
           selected.push($(this).attr("id"));
       });
       if(selected.length == 0) {
           alert("Select one or more products");
           return;
       }
       deactivateSelected(selected);
  };
  deactivateSelected = function(selected) {
       if(confirm("Are you sure?")) {
           $.ajax({
               type:"POST",
               url: "/products/deactivate_selected",
               data: {"selected" : selected},
               success: function(response) {
                   for(var i = 0; i < selected.length; i++) {
                       $("#" + selected[i]).parent().parent().removeClass("active");
                       $("#" + selected[i]).parent().parent().find(".activate-link").show();
                       $("#" + selected[i]).parent().parent().find(".deactivate-link").hide();
                   }
               }
           });
       }
   };
   showNewCategoryInput = function() {
       $("#new-category-div").show();
       $("#category-combo-div").hide();
   };
   showCategoryCombo = function() {
       $("#category-name").val("");
       $("#new-category-div").hide();
       $("#category-combo-div").show();
   };

   $("#save-new-category").click(function(){
       var categoryName = $("#category-name").val();
       if(categoryName == "") {
           alert("Insert a name");
           return;
       }
       $.ajax({
           type:"POST",
           url: "/categories/new_category_ajax",
           data: {"category[name]" : categoryName},
           success: function(response) {
               $("#product_category_id").append("<option value='"+response+"'>"+categoryName+"</option>");
               $("#product_category_id").val(response);
               showCategoryCombo();
           }
       });
   });
   $("#cancel-new-category").click(function(){
       showCategoryCombo();
   });
});