function save(obj){
	/*所有obj都必须有一个uuid 自动生成 和一个 utype 数据类型*/
	/*拥有utype  	数据类型
		  uid		数据主键
		  uuid		为系统自动生成

		  内部之间的关系引用 是uuid
		  分配 meta_uuid_xxx  utype   uid
		  	   meta_seq_uuid    1000  则定义序列


		  	   meta_utype_user   uuid_xxx  这里应该是个集合  找一个表所有的集合 都在这里

		  	   meta_index_user_

		  	   utype   
				
			   元数据
			   meta 	tables   表 字段  		10个table  10个字段
			   meta 	index    索引
			   meta     数据
			   操作历史 

		  	   新增一条数据的处理流程
		  	   1. meta_uuid_1
		  	   2. meta_seq_uuid ++
		  	   3. meta_utype_user   集合  

		  	   查找一张表
		  	   meta_utype_user   uuid都找到
				
			   meta_user_uuid:1
			   meta_user_uuid:2


			   更新一条数据
			   uuid  不变

			   删除一条数据


			   查询一条数据  查询方式 

	*/
}