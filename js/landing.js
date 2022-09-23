(function($) {
  'use strict'; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, 'easeInOutExpo');
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($('#mainNav').offset().top > 100) {
      $('#mainNav').addClass('navbar-scrolled');
    } else {
      $('#mainNav').removeClass('navbar-scrolled');
    }
  };

  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Magnific popup calls
  $('#portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

  /*
   * 추가 기능
   */
  
  // 푸터 연도 계산
  $('footer .year').html(new Date().getFullYear());

  var funcUrl = '';

  // 상단 - 이메일 정보 랜딩처리
  $('.masthead1 form').submit(function (e) {
    e.preventDefault();
    
    var email = $('.masthead1 form input').val();

    if (!email) {
      alert('이메일을 입력하세요');
      return;
    }

    $.ajax({
      type: 'POST',
      url: funcUrl + '/landFromEmail',
      data: { email: email },
      dataType: 'JSON',
      success: function(data) {
        var resultState = data.resultState;
        var result = data.result;

        if (resultState) {
          alert('이메일을 성공적으로 전송했습니다');
        } else {
          alert(result);
        }
      },
      fail: function(data) {
        alert('이메일 정보 전송을 실패했습니다');
      }
    });
  });

   // 하단 - Contact 정보 랜딩처리
   $('#contactForm').submit(function (e) {
    e.preventDefault();
    
    var $form = $('#contactForm .form-control');
    var formData = {};

    for (var i = 0; i < $form.length; i++) {
      formData[$form[i].id] = $form[i].value;
    }

    $.ajax({
      type: 'POST',
      url: funcUrl + '/landFromContact',
      data: formData,
      dataType: 'JSON',
      success: function(data) {
        var resultState = data.resultState;
        var result = data.result;

        if (resultState) {
          sendSMS(formData['phone'], smsText);
          alert('정보를 성공적으로 전송했습니다');
        } else {
          alert(result);
        }
      },
      fail: function(data) {
        alert('정보 전송을 실패했습니다');
      }
    });
  });

  // PC 배너
  $('#banner .apply button').on('click', function(e) {
    var $nameInput = $('#banner .user-input .name');
    var name = $nameInput.val();
    
    var $phoneInput = $('#banner .user-input .phone');
    var phoneNumber = $phoneInput.val().replace(/-/g, '').trim();
    
    var $termsCheckInput = $('#banner .terms input');
    var termsCheck = $termsCheckInput.is(':checked');

    if (!name.match(/[가-힣][가-힣][가-힣]*/g) || !name) {
      alert('이름을 바르게 입력해주세요.');
      
      $nameInput.val('');
      $nameInput.focus();
      return false;
    } else if (isNaN(phoneNumber) || !phoneNumber) {
      alert('전화번호를 바르게 입력해주세요.');
      
      $phoneInput.val('');
      $phoneInput.focus();
      return false;
    } else if (!termsCheck) {
      alert('개인정보 동의가 필요합니다.');
      
      return false;
    }

    // PC 랜딩처리
    $.ajax({
      type: 'POST',
      url: funcUrl + '/landFromBanner',
      data: { name: name, phone: phoneNumber },
      dataType: 'JSON',
      success: function(data) {
        var resultState = data.resultState;
        var result = data.result;

        if (resultState) {
          sendSMS(phoneNumber, smsText);
          alert('정보를 성공적으로 전송했습니다');
        } else {
          alert(result);
        }
      },
      fail: function(data) {
        alert('정보 전송을 실패했습니다');
      }
    });
  });

  // PC 개인정보 동의 팝업
  $('#termsModal').on('show.bs.modal', function (e) {
    $('#banner').css('overflow-y', 'scroll');
  });

  $('#termsModal').on('hidden.bs.modal', function (e) {
    $('#banner').css('overflow-y', 'auto');
  });

  // 모바일 배너
  $('#m-banner .m-apply button').on('click', function(e) {
    var $nameInput = $('#m-banner .m-user-input .name');
    var name = $nameInput.val();
    
    var $phoneInput = $('#m-banner .m-user-input .phone');
    var phoneNumber = $phoneInput.val().replace(/-/g, '').trim();
    
    var $termsCheckInput = $('#m-banner .m-terms input');
    var termsCheck = $termsCheckInput.is(':checked');

    if (!name.match(/[가-힣][가-힣][가-힣]*/g) || !name) {
        alert('이름을 바르게 입력해주세요.');
        
        $nameInput.val('');
        $nameInput.focus();
        return false;
    } else if (isNaN(phoneNumber) || !phoneNumber) {
        alert('전화번호를 바르게 입력해주세요.');
        
        $phoneInput.val('');
        $phoneInput.focus();
        return false;
    } else if (!termsCheck) {
        alert('개인정보 동의가 필요합니다.');
        
        return false;
    }

    // 모바일 랜딩처리
    $.ajax({
      type: 'POST',
      url: funcUrl + '/landFromBanner',
      data: { name: name, phone: phoneNumber },
      dataType: 'JSON',
      success: function(data) {
        var resultState = data.resultState;
        var result = data.result;

        if (resultState) {
          sendSMS(phoneNumber, smsText);
          alert('정보를 성공적으로 전송했습니다');
          
        } else {
          alert(result);
        }
      },
      fail: function(data) {
        alert('정보 전송을 실패했습니다');
      }
    });
  });

})(jQuery); // End of use strict
