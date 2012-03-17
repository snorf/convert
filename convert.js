var convert_namespace = new function() {
  
/**
*
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
*
**/
var t4, str, v, utftext, n, c, blockstart, i, j, W, H0, H1, H2, H3, H4, A, B, C, D, E, temp, msg_len, word_array, inputFields, inputField, div, innerdiv;
function SHA1 (msg) {

	function rotate_left(n,s) {
		t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};

	function cvt_hex(val) {
		str="";
		i;
		v;

		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};


	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		utftext = "";

		for (n = 0; n < string.length; n++) {

			c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	blockstart;
	i, j;
	W = new Array(80);
	H0 = 0x67452301;
	H1 = 0xEFCDAB89;
	H2 = 0x98BADCFE;
	H3 = 0x10325476;
	H4 = 0xC3D2E1F0;
	A, B, C, D, E;
	temp;

	msg = Utf8Encode(msg);

	msg_len = msg.length;

	word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}

	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;

		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;

		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}

	word_array.push( i );

	while( (word_array.length % 16) != 14 ) word_array.push( 0 );

	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );


	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {

		for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
		for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;

		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;

	}

	temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

	return temp.toLowerCase();

}

function firstCharacters(s,n) {
	return s.substring(0,n);
}

div;
function askForInput() {
  
  style = document.createElement('style');
  style.setAttribute('type','text/css');
  
  topLayerStyle = "#convert-top-layer {position:fixed; width:100%; height:100%; margin:0; padding:0; top:0; left:0; background-color:rgba(0,0,0,0.8); z-index:99999}";
  innerLayerStyle = "#convert-inner-layer {width:340px; margin:10px auto; text-align:center}";
  inputStyle = "#convert_input {height: 26px !important;}";
  buttonStyle = ".convert-button {height: 30px; border: 1px solid #ccc; border-bottom: 1px solid #bbb; background-image: -webkit-gradient(linear, left top, left bottom, from(#eeeeee), to(#cccccc)); -webkit-border-radius: 3px; color: #333; line-height: 1; padding: 8px; text-align: center; text-shadow: 0 1px 0 #eee;} .convert-button:active {border: 1px solid #aaa; -webkit-box-shadow: inset 0 0 5px 2px #aaaaaa, 0 0 0 0 #eeeeee;}";
  
  style.innerHTML = topLayerStyle + " " + innerLayerStyle + " " + inputStyle + " " + buttonStyle;
  
  div = document.createElement('div');
  div.id = "convert-top-layer";
  
  innerdiv = document.createElement('div');
  innerdiv.id = "convert-inner-layer";
  innerdiv.innerHTML = "<form id='convert_form' onsubmit='return false;'> \
			<input placeholder='Input' type='password' id='convert_input'/> \
                        <input type='submit' class='convert-button' onclick='convert_namespace.convert(21); return false;' value='21'/>\
                        <input type='submit' class='convert-button' onclick='convert_namespace.convert(11); return false;' value='11'/>\
			<input type='submit' class='convert-button' onclick='convert_namespace.convert(26); return false;' value='26'/>\
</form>";
  
  document.body.appendChild(div);
  document.getElementById("convert-top-layer").appendChild(style);
  document.getElementById("convert-top-layer").appendChild(innerdiv);
  document.getElementById('convert_input').focus();
}

this.convert = function(length) {
  inputField.value = firstCharacters(SHA1(document.getElementById('convert_input').value), length);
  document.body.removeChild(div);
  inputField.focus();
}

this.convertFromExternal = function(text, length) {
  return firstCharacters(SHA1(text), length);
}

inputField;
function findInputFieldAndAskForInput() {
  inputFields = document.getElementsByTagName('input');
  for (i = inputFields.length - 1; i >= 0; i--) {
    if (inputFields[i].value == '-') {
      inputField = inputFields[i];
      askForInput();
      break;
    }
  };
}

findInputFieldAndAskForInput();

}();
