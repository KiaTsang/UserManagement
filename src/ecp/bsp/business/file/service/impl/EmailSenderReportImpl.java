package ecp.bsp.business.file.service.impl;

import java.text.MessageFormat;

import org.springframework.stereotype.Service;

import ecp.bsp.business.file.dto.EmailReportNoticeDTO;
import ecp.bsp.system.framework.mail.impl.EmailSender;

/**
 * 报表邮件发送类
 * 
 * @since 2015-06-23 <br>
 * 
 * @author zengqingyue.
 */
@Service
public class EmailSenderReportImpl extends EmailSender<EmailReportNoticeDTO>{

	/**
	 * 格式化发送的主题.
	 * 
	 * @param mailMessageSubject
	 *             邮件主题模板.
	 * @param emailNotice
	 *             邮件通知消息.
	 *             
	 * @return 实际需发送的主题.
	 */
	@Override
	public String formatEmailSubject(String mailMessageSubject,
			EmailReportNoticeDTO emailNotice) {
		String emailMessage  = MessageFormat.format(mailMessageSubject, new Object[] {
				emailNotice.getReportTaskName(),
				emailNotice.getRepTaskActivityStatusName()
				});
				
		return emailMessage;
	}

	/**
	 * 格式化发送的内容.
	 * 
	 * @param mailMessageContext
	 *             邮件内容模板.
	 * @param emailNotice
	 *             邮件通知消息.
	 *             
	 * @return 实际需发送的内容.
	 */
	@Override
	public String formatEmailContext(String mailMessageContext,
			EmailReportNoticeDTO emailNotice) {
		String emailMessage = MessageFormat.format(mailMessageContext, new Object[] {
				emailNotice.getTaskBatchCode(),
				emailNotice.getProductTypeName(),
				emailNotice.getOperatorName(),
				emailNotice.getBrandName(),
				emailNotice.getRepTaskActivityStatusName(),
				emailNotice.getPaaUsername(),
				emailNotice.getFinishTime()});
		
		return emailMessage;
	}

}