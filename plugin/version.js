// 注入插件
getVersion();

const version = function (hook) {
  hook.beforeEach(function (html) {
    if (html.indexOf('${lastVersion}') >= 0) {
      let versionNum = localStorage.getItem('datav-version');
      return html.replaceAll('${lastVersion}', versionNum ? versionNum : '${lastVersion}');
    }
    return html;
  });
};

function getVersion() {
  axios({
    url: 'http://version.pig4cloud.com',
    method: 'get',
  }).then((res) => {
    localStorage.setItem('datav-version', res.data);
  });
}
