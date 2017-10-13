package ecp.bsp.business.file.dto;

public class Select2ResultDTO {
	private Select2JSON json;
	private boolean success;

	public Select2JSON getJson() {
		return json;
	}

	public void setJson(Select2JSON json) {
		this.json = json;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

}
