export function http<T = any>(params: HttpParams): Promise<T> {
  const {
    service,
    data,
    loading = true,
    method = "POST",
    url,
  } = params as HttpPageParams;
  const requestData = Object.assign({}, data);
  if (loading){
    uni.showLoading({
      title: '加载中...',
    })
  }

  const requestConfig = {
    url: url,
    method,
    data: requestData,
  };

  console.log(requestConfig, "请求参数");
  return new Promise((resolve, reject) => {
    uni.request({
      ...requestConfig,
      header: { "content-type": "application/x-www-form-urlencoded" },
      success: (res: any) => {
        console.l
        uni.hideLoading()
        if (res.data.code == 200) {
          resolve(res.data);
        }else{
          uni.showToast({
            title: res.data.msg  || '未知错误',
            icon: 'none',
          })
        }
      },
      fail(error) {
        console.log("失败了");
        reject(error);
      },
    });
  });
}
