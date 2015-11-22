package com.ttsc.data.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 读取文件的工具类
 * @author stone.zhu
 *
 */
public class ReadPropertiesUtil {

  private static Logger logger = LoggerFactory.getLogger(ReadPropertiesUtil.class);
  
  //根据系统的自定义语言类型加载配置文件
  public static Map<String,Properties> languageProperties ;
  //配置文件信息
  public static Map<String,Properties> sysProperties = new HashMap<String,Properties>();
  
  /**
   * 读取配置文件定义的信息
   * @param key 关键字
   * @param fileName 文件名称
   * @return
   */
  public static  String getProperties(String key,String fileName){
      Properties props = null;
      try {
          props = sysProperties.get(fileName);
          if(props == null){
              props = new Properties();
              ClassLoader cl = new ReadPropertiesUtil().getClass().getClassLoader();
              InputStream is = cl.getResourceAsStream(fileName);
              props.load(is);
              sysProperties.put(fileName, props);
          }
          return props.getProperty(key);
          
      } catch (IOException e) {
          logger.error("not properties file found @"+fileName);
      }
      return null;
  }
  
  /**
   * 
   * @param key
   * @return
   */
  public static String get(String key){
      return getProperties(key, "application.properties");
  }
  
  /**
   * 根据配置文件，以及本地的语言类型读取(目前没有用到)
   * @param key 关键字
   * @param locale 本地的语言类型
   * @return
   */
  public static String getPropertiesByLocale(String key,String locale){
      List<String> locales=new ArrayList<String>();
      locales.add("zh_CN");
      //locales.add("zh_TW");
      locales.add("en_US");
      //locales.add("ja_JP");
      
      if(languageProperties == null){
          languageProperties = new HashMap<String,Properties>();
          ClassLoader cl = new ReadPropertiesUtil().getClass().getClassLoader();
          Properties props = null;
          for(String l:locales){
              String fileName = "application_"+l+".properties";
              InputStream is = cl.getResourceAsStream(fileName);
              props = new Properties();
              try {
                  props.load(is);
              } catch (IOException e) {
                  logger.error("not properties file found @"+fileName);
              }
              languageProperties.put(l, props);
          }
          
      } 
      if(locale!=null&&!"".equals(locale)){
          if(!locales.contains(locale)){
              locale = "zh_CN";
          }
      }else{
          locale = "zh_CN";
      }
      String value = languageProperties.get(locale).getProperty(key);
      return value != null ? value : key;
  }
}
