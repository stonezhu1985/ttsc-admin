package com.ttsc.data.po;

import java.util.List;

/**
 * 分页显示
 * @author arno.jiang
 * @param <T>
 *
 */
public class PagePo<T> {

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}
	//总数
	private int total;
	//每页记录数
	private List<T> list;
}
