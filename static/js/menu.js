let collapseKey = "collapsed=true;Path=/;";

(function($) {
  let lnbUI = {
    click: function (target) {
      let $target = $(target);

      $target.each(function() {
        if (findChildren($(this))) { return; }
        $(this).addClass('noDepth');
      });

      function findChildren(obj) {
        return obj.find('> ul').length > 0;
      }

      $target.on('click', 'a', function(e) {
        e.stopPropagation();
        fnAccordion($(this));
      });
    }
  };

  // Call lnbUI
  $(function() {
    //1depth
    lnbUI.click('#lnb li');

    //2depth : dropdown func
    $('[data-toggle="side-dropdown"]').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      fnDropdown($(this));
    });

    //3depth : dropdown-accordion func
    $('.dropdown-accordion').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      fnDropdownAccordion($(this));
    });

    //sidebar fold button click했을 때
    $("#sidebarToggle").on('click', function() {
      fnFold($(this));
    });

    //sidebar가 아닌 곳을 click했을 때
    $('#content').on('click', function() {
      $('.toggled #lnb li').removeClass('open'); //fold일 때 모든 1depth 닫기
      $('.dropdown-menu').removeClass('open'); //모든 2depth 닫기
    });

    //multiselect 동작
    $('#multi-select').multiselect({
      nonSelectedText: 'none checked',
      onChange: function(option) {
        let values = [];
        $('#multi-select option').each(function() {
          if ($(this).val() !== option.val()) { values.push($(this).val()); }
        });
        $('#multi-select').multiselect('deselect', values);
      }
    });

    $('.modal-multi-select').multiselect();
  });

}(jQuery));

function getCookie(name) {
  let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
}

//full : 1depth / fold : 1depth
function fnAccordion(target) {
  let $this = $(target),
    $depthTarget = $this.next(),
    $siblings = $this.parent().siblings(),
    isToggled = $(".lef-nav").hasClass("toggled");

  $siblings.removeClass('on').removeClass('open');
  $('#lnb .dropdown-menu').removeClass('open'); //모든 2depth 닫기
  $('.dropdown-accordion').next().attr('aria-expanded', false); //모든 4depth 닫기

  if ($depthTarget.css('display') === 'none') {
    $this.parent().addClass('on').addClass('open');
  } else {
    $this.parent().removeClass('on').removeClass('open');
  }
  if (isToggled) { fnDropdown($this); } //fold 상태 체크
}

//full : 2depth / fold : 1depth
function fnDropdown(target) {
  let $this = $(target),
    $menu = $('.dropdown-menu[aria-labelledby="' + $this.attr('id') + '"]');

  $('#lnb .dropdown-accordion').next().attr('aria-expanded', false); //모든 4depth 닫기

  if ($this.hasClass('fold-dropdown-button')) { //fold 상태 체크
    fnDropdownAccordion($this);
  } else {
    if ($menu.css("display") === "none"){
      $('#lnb .dropdown-menu').removeClass('open');
      $menu.addClass('open');
    } else {
      $menu.removeClass('open');
    }
  }
}

//full : 3depth / fold : 2depth
function fnDropdownAccordion(target) {
  let $this = $('#' + $(target).attr('aria-controls'));
  $this.attr('aria-expanded', $this.css('display') === 'none');
}

function switchCollapseCookie() {
  if ($("#lnb").hasClass("fold")) {
    let date = new Date();
    date.setTime(date.getTime() + 24*60*60*1000);
    document.cookie = collapseKey + "Expires=" + date.toUTCString() + ";";
  } else {
    document.cookie = collapseKey + 'Expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  }
}

function fnFold(target) {
  $(".lef-nav").toggleClass("toggled");
  $("#lnb").toggleClass("fold");

  $(".lef-sidebar-brand-text").toggleClass("fold");
  $(".lef-sidebar-brand-sub-text").toggleClass("fold");

  $('#lnb ul li.open').removeClass('open'); //1depth 닫기
  $(target).find('i').toggleClass('icon-chevrons-left').toggleClass('icon-chevrons-right'); //toggle fold 버튼 class 변경

  let isToggled = $(".lef-nav").hasClass("toggled"),
    homeTitle = $('.icon-home').next().text(),
    $menu;
  if (isToggled) {
    localStorage.setItem("menu", 'close');
    $('.icon-home').attr('title', homeTitle);
    $('.icon-home').parent().attr('title', homeTitle);

    $menu = $('#lnb ul li:not(.noDepth, .dropright)').find('a:first:not(.dropdown-accordion)');
    $menu.each(function(idx) {
      $(this).parent('li').addClass('dropright');

      $(this).attr('id', 'fold-dropdown-' + idx);
      $(this).attr('title', $(this).text());
      $(this).addClass('fold-dropdown-button');

      $(this).next().addClass('dropdown-menu');
      $(this).next().attr('aria-labelledby', 'fold-dropdown-' + idx);
    });
  } else {
    localStorage.setItem("menu", 'open');
    $('.icon-home').removeAttr('title');
    $('.icon-home').parent().removeAttr('title');

    $menu = $('#lnb a[id^=fold-dropdown-]');
    $menu.each(function( idx ){
      $(this).parent('li').removeClass('dropright');

      $(this).removeAttr('id');
      $(this).removeAttr('title');
      $(this).removeClass('fold-dropdown-button');

      $(this).next().removeClass('dropdown-menu').removeClass('open'); //open된 dropdown box 닫기
      $(this).next().removeAttr('aria-labelledby');
    });
  }
}