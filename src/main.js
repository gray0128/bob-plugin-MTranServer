/**
 * MTranServer翻译插件
 * 基于MTranServer API实现的Bob翻译插件
 */

var lang = require("./lang.js");

/**
 * 获取支持的语言列表
 * @returns {string[]} 支持的语言代码列表
 */
function supportLanguages() {
    // 返回插件支持的语言列表，使用Bob的语言代码
    return lang.supportLanguages;
}

/**
 * 翻译函数
 * @param {object} query 查询参数
 * @param {function} completion 完成回调
 */
function translate(query, completion) {
    // 获取用户配置
    const apiUrl = $option.apiUrl || "https://mtranserver.xxx.xyz";
    const token = $option.token || "";
    
    // 去除URL末尾的斜杠
    const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
    
    // 构建请求URL
    let url = `${baseUrl}/translate`;
    if (token) {
        url = `${url}?token=${encodeURIComponent(token)}`;
    }
    
    // 构建请求参数
    const params = {
        from: lang.langMap[query.detectFrom] || query.detectFrom,
        to: lang.langMap[query.detectTo] || query.detectTo,
        text: query.text
    };
    
    const header = {
        "Content-Type": "application/json"
    };
    if (token) {
        header["Authorization"] = token;
    }

    // 发送请求
    $http.post({
        url: url,
        header: header,
        body: params,
        handler: function(resp) {
            if (resp.error) {
                // 请求错误
                completion({
                    error: {
                        type: "network",
                        message: "请求失败，错误信息：" + resp.error.message
                    }
                });
                return;
            }
            
            if (resp.response.statusCode !== 200) {
                // 服务器错误
                completion({
                    error: {
                        type: "api",
                        message: "请求失败，状态码：" + resp.response.statusCode
                    }
                });
                return;
            }
            
            // 解析响应
            const data = resp.data;
            if (!data || !data.result) {
                completion({
                    error: {
                        type: "api",
                        message: "返回结果为空或格式不正确"
                    }
                });
                return;
            }
            
            // 返回翻译结果
            completion({
                result: {
                    from: query.detectFrom,
                    to: query.detectTo,
                    toParagraphs: data.result.split('\n')
                }
            });
        }
    });
}

/**
 * 自定义翻译超时时间（可选）
 * @returns {number} 超时时间（秒）
 */
function pluginTimeoutInterval() {
    return 60;
}

/**
 * 自定义验证函数（可选）
 * @param {function} completion 完成回调
 */
function pluginValidate(completion) {
    const apiUrl = $option.apiUrl || "";
    
    if (!apiUrl) {
        completion({
            result: false,
            error: {
                type: "missingParameter",
                message: "请填写API地址",
                troubleshootingLink: "https://github.com/xxnuo/MTranServer"
            }
        });
        return;
    }
    
    // 构建请求URL
    const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
    let url = `${baseUrl}/health`;
    if ($option.token) {
        url = `${url}?token=${encodeURIComponent($option.token)}`;
    }
    
    // 发送请求验证API是否可用
    $http.get({
        url: url,
        handler: function(resp) {
            if (resp.error || resp.response.statusCode !== 200) {
                completion({
                    result: false,
                    error: {
                        type: "api",
                        message: "API连接失败，请检查API地址和Token是否正确",
                        troubleshootingLink: "https://github.com/xxnuo/MTranServer"
                    }
                });
                return;
            }
            
            // 验证成功
            completion({
                result: true
            });
        }
    });
}

module.exports = {
    supportLanguages,
    translate,
    pluginTimeoutInterval,
    pluginValidate
};
