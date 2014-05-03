$(document).ready(function() {

    /**
     * 默认主体内容数据
     * 
     * @const
     * @type {Array}
     */
    var DEFAULT_APP_DATA = [
        {
            name: 'outlook',
            showName: 'Outlook',
            url: 'https://outlook.com'
        },
        {
            name: 'people',
            showName: 'People',
            url: 'https://people.live.com'
        },
        {
            name: 'calendar',
            showName: 'Calendar',
            url: 'https://calendar.live.com'
        },
        {
            name: 'onedrive',
            showName: 'Onedrive',
            url: 'https://onedrive.com'
        },
        {
            name: 'word',
            showName: 'Word',
            url: 'https://office.live.com/start/Word.aspx'
        },
        {
            name: 'excel',
            showName: 'Excel',
            url: 'https://office.live.com/start/Excel.aspx'
        },
        {
            name: 'powerpoint',
            showName: 'PowerPoint',
            url: 'https://office.live.com/start/PowerPoint.aspx'
        },
        {
            name: 'onenote',
            showName: 'OneNote',
            url: 'https://www.onenote.com/notebooks'
        }
    ];

    /**
     * 图标html片段
     * 
     * @const
     * @type {string}
     */
    var ICON_TPL = ''
        + '<a target="_blank" href="#{url}" class="icon" id="#{name}-icon">'
        +    '<span>#{showName}</span>'
        + '</a>';
    
    /**
     * 拼串
     * @param  {string}         tpl  需要替换的字符串
     * @param  {Array|Object}   data 替换内容
     * @return {string}         拼好的字符串
     */
    function stringFormat( tpl, data ) {
        return tpl.replace(
            /\#\{([-a-z0-9_]+)\}/ig,
            function ( all, name ) {
                return data[ name ] || '';
            }
        );
    }

    /**
     * 保存到localStorage
     * @param  {Array} dataArr 主体内容数据
     */
    function save(dataArr) {
        localStorage.setItem('appData', JSON.stringify(dataArr));
    }

    // 从localStorage读取数据
    // 如果读取不到则使用默认数据
    function load() {
        var resultStr = localStorage.getItem('appData');
        var dataArr = [];

        if(resultStr) {
            dataArr = JSON.parse(resultStr);
        }
        else {
            dataArr = DEFAULT_APP_DATA;
        }

        return dataArr;
    }

    /**
     * 渲染主体内容
     * @param  {Array}  dataArr 主体内容数据
     * @return {string} 主体内容dom
     */
    function renderDom(dataArr) {
        return $.map(dataArr, function(item, index) {
            return stringFormat(ICON_TPL, {
                name: item.name,
                showName: item.showName,
                url: item.url
            });
        }).join('');
    }

    // 初始化
    function init() {
        var appData = load(); // 读取数据
        var appTpl = renderDom(appData); // 渲染dom

        var beforeSortIndex = 0;
        var beforeTarget = {
            name: '',
            showName: '',
            url: ''
        };
        var afterSortIndex = 0;

        $('#container').html(appTpl);

        $('#container')
            .sortable()
            .on('sortactivate', function (event, ui) {
                beforeSortIndex = ui.item.index();
                beforeTarget = appData[beforeSortIndex];
            })
            .on('sortupdate', function (event, ui) {
                afterSortIndex = ui.item.index();
                appData.splice(beforeSortIndex, 1);
                appData.splice(afterSortIndex, 0, beforeTarget);
                // 保存新的顺序到localStorage
                save(appData);
            });
    }

    init();
});