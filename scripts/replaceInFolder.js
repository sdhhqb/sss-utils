// 以下脚本用于在一个目录中查找替换内容

var fs = require('fs');
var path = require('path')


// 以下参数每次执行前设置
// 只执行代码，不实际替换
var tryrun = true
// 查找目录
var dir = 'D:\\work\\xxx'
// 匹配正则表达式
var findReg = /<tr>[\s\S]*?<\/tr>/
// 替换文本
var replaceStr = `</tr>
    <td colspan="9" style="padding-top: 15px;"></td>
  </tr>
`




fs.readdir(dir, function(err, filenames) {
  if (err) {
    onError(err);
    return;
  }
  filenames.forEach(fname => {
    let fileName = path.resolve(dir, fname)
    fs.readFile(fileName, 'utf8', function(err, content) {
      if (err) {
        onError(err);
        return;
      }
      let matched = content.match(findReg)
      console.log(fileName, !!matched)
      if (matched) {
        let matchedStrLen = matched[0].length;
        console.log(matchedStrLen)
        // 由于正则表达式比较简略，一般只设置文本段的开头和结尾，可能会匹配不同的内容。
        // 可以结合匹配到的文本段的长度来检查是否匹配正确。
        let contentNew = content.replace(findReg, replaceStr)
        if (matchedStrLen < 900) {
          console.log('do replace')

          if (!tryrun) {
            fs.writeFile(fileName, contentNew, 'utf8', function (err) {
              if (err) {
                onError(err);
                return;
              }
            })
          }

        }
      }
    });
  })
})


// error
function onError(err) {
  console.log('error', err)
}

