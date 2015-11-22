package com.ttsc.data.result;

import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * 通用的返回
 * @author stone.zhu
 *
 * @param <T>
 */
public class BasicResult<T> {
	public final static String ERROR = "0";
    //信息
    private String message;
    //标识code（0:正确 1失败，其他待定）
    private String code = "0";
    //结果集
    private T singleResult;

    @JsonIgnore
    protected String callback;

    @JsonIgnore
    public String getCallback() {
        return callback;
    }

    @JsonIgnore
    public void setCallback(String callback) {
        this.callback = callback;
    }

    public T getSingleResult() {
        return singleResult;
    }

    public void setSingleResult(T singleResult) {
        this.singleResult = singleResult;
    }
    
    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }
    
    public String getCode() {
      return code;
    }

    public void setCode(String code) {
      this.code = code;
    }
}
