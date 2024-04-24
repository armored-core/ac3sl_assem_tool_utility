// ==UserScript==
// @name         AC3SL Assemble Tool Utility
// @namespace    https://github.com/armored-core
// @version      0.1
// @description  AC3SL アセンスクリプトにテンプレート機体と読み込み機能を追加する
// @author       armored-core
// @match        http://armis.s57.xrea.com/ac3/misc/x/hashisi_sl.htm*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const formControl = document.forms['hashiasm'];

    const assembleTemplate = document.createElement('select');
    const robots = [
        { name: 'マシショット066', code: 'U8qAfXZ7B21H5FcY40' },
        { name: '対ACショットSRVT', code: '48qCPXY7B2t0HFcY41' },
        { name: 'マシショットORDER', code: 'U8q4PXZ7B2t15FcY41' },
        { name: '左ミサORDER(ドミニオン)', code: '48q4CXXcWJfoXlcW42' },
        { name: '対ACショットMLKS', code: 'S9DK1XY7B2t0HF2c41' },
    ];
    assembleTemplate.setAttribute('id', 'assemble-template');
    assembleTemplate.innerHTML = '<option data-assem-code="">-</option>';
    robots.forEach((val) => {
        assembleTemplate.innerHTML += `<option value="${val.code}">${val.name}</option>"`;
    });

    const templateInsertTarget = document.querySelector(
        'td[bgcolor="#FF0000"] ~ td'
    );

    templateInsertTarget.parentNode.insertBefore(
        assembleTemplate,
        templateInsertTarget
    );

    function loadHash(form, hash) {
        form.editCode.value = hash;
        form.buttonCode.click();
    }

    document
        .getElementById('assemble-template')
        .addEventListener('change', function () {
            loadHash(formControl, this.value);
        });

    // ハッシュコード付きURL追加
    const inputUrl = document.createElement('input');
    inputUrl.setAttribute('id', 'hash-url');
    inputUrl.setAttribute('type', 'text');
    inputUrl.setAttribute('placeholder', 'コード付きURL');

    const inputInsertTarget = document.getElementById('infoCode');
    inputInsertTarget.parentNode.appendChild(inputUrl);

    document
        .getElementsByClassName('genericButton')[0]
        .addEventListener('click', () => {
            document.getElementById('hash-url').value =
                `${location.href.replace(location.search, '')}?${document.getElementById('editCode').value}`;
        });

    if (location.search) {
        loadHash(formControl, location.search.replace('?', ''));
    }
})();
