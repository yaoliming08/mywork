import { NextResponse } from 'next/server'
const mysql = require('mysql2/promise')
 
// 创建全局的 MySQL 连接池
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '110.42.239.134', // 服务器地址
  port:'13887',
  user: 'root',
  password: 'Kjteck@UTdkPD_123', // 密码
  database: 'dseg_kj',
})
 
export async function GET(request:any) {
    console.log(111111111111)
  try {
    // 从连接池中获取连接
    const connection = await pool.getConnection()

    // 执行 MySQL 查询
    // const [rows, fields] = await connection.query('SELECT * FROM apply_assure')


    const [rows, fields] = await connection.query('SELECT * FROM dseg_dict_type')

    // SELECT b.CODE AS code,b.NAME AS name,b.ORDER_INDEX AS orderIndex,a.ENTRYCODE_TYPE as entryCodeType
		// FROM dseg_dict_type a LEFT JOIN dseg_dict_entry b ON a.ID=b.DICT_TYPE_ID
    

		// WHERE a.DEL_FLAG=0 AND b.DEL_FLAG=0 AND a.CODE='INDUSTRY.CATEGORY' 
		// and  a.AREA_CODE = '11010998'
		// order by b.ORDER_INDEX


   
 
    // 释放连接回连接池
    connection.release()
 
    return NextResponse.json({ data: rows }, { status: 200 })
  } catch (error) {
    console.log(9999999999)
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}