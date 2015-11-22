package com.ttsc.data.action;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.util.JSONWrappedObject;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;

import com.ttsc.data.result.BasicResult;

import java.io.IOException;


public class MappingJsonpHttpMessageConverter extends MappingJacksonHttpMessageConverter {

    @SuppressWarnings("rawtypes")
	@Override
    protected void writeInternal(Object object, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
        
        String callback = null;
        if (object instanceof BasicResult) {
            callback = ((BasicResult) object).getCallback();
        }

        if (StringUtils.isBlank(callback)) {
            super.writeInternal(object, outputMessage);
            return;
        }
        
        JsonEncoding encoding = getJsonEncoding(outputMessage.getHeaders().getContentType());
        JsonGenerator generator = super.getObjectMapper().getJsonFactory().createJsonGenerator(outputMessage.getBody(), encoding);
        
        JSONWrappedObject jsonWrappedObject = new JSONWrappedObject(callback + "(", ");", object);
        super.getObjectMapper().writeValue(generator, jsonWrappedObject);
    }
}
