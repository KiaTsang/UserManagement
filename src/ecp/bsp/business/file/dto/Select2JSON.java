package ecp.bsp.business.file.dto;

import java.util.List;

public class Select2JSON
{
    private List<Select2DTO<String>> results;
    // 指示是否还有更多的记录
    private boolean more;

    /**
     * @return the results
     */
    public List<Select2DTO<String>> getResults()
    {
        return results;
    }

    /**
     * @param results the results to set
     */
    public void setResults(List<Select2DTO<String>> results)
    {
        this.results = results;
    }

    /**
     * @return the more
     */
    public boolean isMore()
    {
        return more;
    }

    /**
     * @param more the more to set
     */
    public void setMore(boolean more)
    {
        this.more = more;
    }
}
