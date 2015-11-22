/*
 *�����ԭ����Vanadium,ԭ�����Ʋ�ǰ��http://vanadiumjs.com/�鿴
 *�������Mr.Think��������,Mr.Think�Ĳ���:http://MrThink.net/
 *ת�ؼ�ʹ�������ע��ԭ����.
*/
$(function(){
	//������Ӻ�*,Mr.Think���,ԭ�����
    $("input[class*=:required]").after("<span> *</span>")
});
 //������Ϣ��ʽ����
Vanadium.config = {
    valid_class: 'rightformcss',//��֤��ȷʱ����ʽ
    invalid_class: 'failformcss',//��֤ʧ��ʱ�ñ���ʽ
    message_value_class: 'msgvaluecss',//�����ʽ�ǵ�����Ϣ�е���ֵ����ʽ
    advice_class: 'failmsg',//��֤ʧ��ʱ������Ϣ����ʽ
    prefix: ':',
    separator: ';',
    reset_defer_timeout: 100
}
//��֤���ͼ�������Ϣ����
Vanadium.Type = function(className, validationFunction, error_message, message, init) {
  this.initialize(className, validationFunction, error_message, message, init);
};
Vanadium.Type.prototype = {
  initialize: function(className, validationFunction, error_message, message, init) {
    this.className = className;
    this.message = message;
    this.error_message = error_message;
    this.validationFunction = validationFunction;
    this.init = init;
  },
  test: function(value) {
    return this.validationFunction.call(this, value);
  },
  validMessage: function() {
    return this.message;
  },
  invalidMessage: function() {
    return this.error_message;
  },
  toString: function() {
    return "className:" + this.className + " message:" + this.message + " error_message:" + this.error_message
  },
  init: function(parameter) {
    if (this.init) {
      this.init(parameter);
    }
  }
};
Vanadium.setupValidatorTypes = function() {
Vanadium.addValidatorType('empty', function(v) {
    return  ((v == null) || (v.length == 0));
  });
//***************************************����Ϊ��֤����,ʹ��ʱ�ɽ������õ����ж�
Vanadium.addValidatorTypes([
	//ƥ���Сд�ĵ�ֵ
    ['equal', function(v, p) {
      return v == p;
    }, function (_v, p) {
      return '�����ֵ������<span class="' + Vanadium.config.message_value_class + '">' + p + '���\(���ִ�Сд\)</span>.'
    }],
    //��ƥ���Сд�ĵ�ֵ
    ['equal_ignore_case', function(v, p) {
      return v.toLowerCase() == p.toLowerCase();
    }, function (_v, p) {
      return '�����ֵ������<span class="' + Vanadium.config.message_value_class + '">' + p + '���\(�����ִ�Сд\)</span>.'
    }],
    //�Ƿ�Ϊ��
    ['required', function(v) {
      return !Vanadium.validators_types['empty'].test(v);
    }, '�����Ϊ��!'],
    //ǿ��ѡ�� 
    ['accept', function(v, _p, e) {
      return e.element.checked;
    }, '�������!'],
    //
    ['integer', function(v) {
      if (Vanadium.validators_types['empty'].test(v)) return true;
      var f = parseFloat(v);
      return (!isNaN(f) && f.toString() == v && Math.round(f) == f);
    }, '������һ����ȷ������ֵ.'],
    //����
    ['number', function(v) {
      return Vanadium.validators_types['empty'].test(v) || (!isNaN(v) && !/^\s+$/.test(v));
    }, '������һ����ȷ������.'],
    //
    ['digits', function(v) {
      return Vanadium.validators_types['empty'].test(v) || !/[^\d]/.test(v);
    }, '������һ���Ǹ�����,��0.'],
    //ֻ������Ӣ����ĸ
    ['alpha', function (v) {
      return Vanadium.validators_types['empty'].test(v) || /^[a-zA-Z\u00C0-\u00FF\u0100-\u017E\u0391-\u03D6]+$/.test(v)   //% C0 - FF (? - ?); 100 - 17E (? - ?); 391 - 3D6 (? - ?)
    }, '������Ӣ����ĸ.'],
    //����ASCII����ģʽ������Ӣ����ĸ
    ['asciialpha', function (v) {
      return Vanadium.validators_types['empty'].test(v) || /^[a-zA-Z]+$/.test(v)   //% C0 - FF (? - ?); 100 - 17E (? - ?); 391 - 3D6 (? - ?)
    }, '����ASCII������Ӣ����ĸ.'],
	//Ӣ����ĸ������
    ['alphanum', function(v) {
      return Vanadium.validators_types['empty'].test(v) || !/\W/.test(v)
    }, '������Ӣ����ĸ������.'],
	//������֤
    ['email', function (v) {
      return (Vanadium.validators_types['empty'].test(v) || /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(v))
    }, '�����ʽ����ȷ,����'],
    ['mobilephone', function (v) {
      return (Vanadium.validators_types['empty'].test(v) || /^(((1[3-8][0-9]{1})|(15[0-9]{1}))+\d{8})/.test(v))
    }, '�ֻ���ʽ����ȷ,����'],
    ['phone', function (v) {
      return (Vanadium.validators_types['empty'].test(v) || /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(v))
    }, '�绰��ʽ����ȷ,����'],
    ['fax', function (v) {
      return (Vanadium.validators_types['empty'].test(v) || /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(v))
    }, '�����ʽ����ȷ,����'],
    //��ַ
    ['url', function (v) {
      return Vanadium.validators_types['empty'].test(v) || /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(v)
    }, '��������ȷ����ַ,����:http://www.baidu.com'],
    //���ڸ�ʽ
    ['date_au', function(v) {
      if (Vanadium.validators_types['empty'].test(v)) return true;
      var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      if (!regex.test(v)) return false;
      var d = new Date(v.replace(regex, '$2/$1/$3'));
      return ( parseInt(RegExp.$2, 10) == (1 + d.getMonth()) ) && (parseInt(RegExp.$1, 10) == d.getDate()) && (parseInt(RegExp.$3, 10) == d.getFullYear() );
    }, '��������ȷ�����ڸ�ʽ,����:28/05/2010.'],
    //����̶������ַ���
    ['length',
      function (v, p) {
        if (p === undefined) {
          return true
        } else {
          return v.length == parseInt(p)
        }
        ;
      },
      function (_v, p) {
        return '�����ַ����ȵ���<span class="' + Vanadium.config.message_value_class + '">' + p + '</span>��.'
      }
    ],
    //
    ['min_length',
      function (v, p) {
        if (p === undefined) {
          return true
        } else {
          return v.length >= parseInt(p)
        }
        ;
      },
      function (_v, p) {
        return '�����ַ����Ȳ�����<span class="' + Vanadium.config.message_value_class + '">' + p + '</span>��.'
      }
    ],
    ['max_length',
      function (v, p) {
        if (p === undefined) {
          return true
        } else {
          return v.length <= parseInt(p)
        }
        ;
      },
      function (_v, p) {
        return '�����ַ����Ȳ�����<span class="' + Vanadium.config.message_value_class + '">' + p + '</span>��.'
      }
    ],
	//�ж���������ͬ
    ['same_as',
      function (v, p) {
        if (p === undefined) {
          return true
        } else {
          var exemplar = document.getElementById(p);
          if (exemplar)
            return v == exemplar.value;
          else
            return false;
        }
        ;
      },
      function (_v, p) {
        var exemplar = document.getElementById(p);
        if (exemplar)
          return '�����������벻��ͬ.';
        else
          return 'û�пɲο�ֵ!'
      },
      "",
      function(validation_instance) {
        var exemplar = document.getElementById(validation_instance.param);
        if (exemplar){
          jQuery(exemplar).bind('validate', function(){
            jQuery(validation_instance.element).trigger('validate');
          });
        }
      }
    ],
	//ajax�ж��Ƿ����ֵ
    ['ajax',
      function (v, p, validation_instance, decoration_context, decoration_callback) {
        if (Vanadium.validators_types['empty'].test(v)) return true;
        if (decoration_context && decoration_callback) {
          jQuery.getJSON(p, {value: v, id: validation_instance.element.id}, function(data) {
            decoration_callback.apply(decoration_context, [[data], true]);
          });
        }
        return true;
      }]
  ])
  if (typeof(VanadiumCustomValidationTypes) !== "undefined" && VanadiumCustomValidationTypes) Vanadium.addValidatorTypes(VanadiumCustomValidationTypes);
};
