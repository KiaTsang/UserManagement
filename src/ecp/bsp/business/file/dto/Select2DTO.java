package ecp.bsp.business.file.dto;

import java.util.HashMap;
import java.util.Map;

public class Select2DTO<T> {
    private T id;
    private String text;
    private Long pid;
    private String code;
    private String projectManager;
    private String type;
    private String realName;
    private final Map<String, String> extraInfos = new HashMap<String, String>();

    public String getText()
    {
        return text;
    }

    public void setText(String text)
    {
        this.text = text;
    }

    public T getId()
    {
        return id;
    }

    public void setId(T id)
    {
        this.id = id;
    }

    public Long getPid()
    {
        return pid;
    }

    public void setPid(Long pid)
    {
        this.pid = pid;
    }

    public String getCode()
    {
        return code;
    }

    public void setCode(String code)
    {
        this.code = code;
    }

    public String getProjectManager()
    {
        return projectManager;
    }

    public void setProjectManager(String projectManager)
    {
        this.projectManager = projectManager;
    }

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public String getRealName()
    {
        return realName;
    }

    public void setRealName(String realName)
    {
        this.realName = realName;
    }

    /**
     * @return the extraInfos
     */
    public Map<String, String> getExtraInfos()
    {
        return extraInfos;
    }
}
