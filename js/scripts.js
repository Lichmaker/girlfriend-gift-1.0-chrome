// Empty JS for your own code to be here

/**
 * 图片自动缩放函数
 * @image: 要改变大小的图片
 * @width: 图片的最大宽度
 * @height: 图片的最大高度
 * @desc: 当图片的宽高任一个大于参数里设置的值的时候，图片就会等比例缩小，且位置相对于外面的容器左右居中
 */
var SetImageAuto = {};

// 设置居中
function SetMiddle(image, height) { /// <summary>重设图片大小后让图片相对于DIV居中</summary> 
    if (typeof(image) == 'string') image = document.images[image] || document.getElementById(image);
    var div = image.parentNode;
    if (div.nodeName != "DIV") {
        div = div.parentNode;
    }
    if (image.height > 0 && image.height < height) {
        var marginTopVal = (height - image.height) / 2;
        image.style.marginTop = parseInt(marginTopVal) + "px"; ///不加px,在火狐下不支持！ 
    } else {
        image.height = height;
        image.style.marginTop = "0px";
    }
}

// 重设大小
SetImageAuto.Resize1 = function(image, width, height) {
    if (width == null || height == null) return;
    image.removeAttribute('width');
    image.removeAttribute('height');
    var w = image.width,
    h = image.height;
    var scalingW = w / width,
    scalingH = h / height;
    var scaling = w / h;
    if (scalingW >= scalingH) {
        image.width = width;
        image.height = width / scaling;
    } else {
        image.height = height;
        image.width = height * scaling;
    }
}
function imgReSize(imgObj, w, h) {
 SetImageAuto.Resize1(imgObj, w, h);
    SetMiddle(imgObj, h);
}

$.ajax({
    type : "GET",
    url : "http://localhost:8081/get",
    dataType : "json",
    data : {},
    success : function(data) {
        console.log(data)
        $('#onlyonepic').attr('src', data.url)
        $('#onlyonepic').on('load',function () {
            imgReSize(this, 600, 600);
        });
        $('#onlyonetitle').text(data.mod_date)
    },
});