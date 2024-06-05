##### <!-- 收起 -->

<style> 
.imgBox{
  display: flex; 
  flex-direction: column; 
  margin: 5%; 
  justify-content: center;
  border: 2px solid black;
}
</style>

<!------------  style  ------------>

<!----------- ref start ----------->

[Podman 官網]: https://podman.io/
[OCI]: https://opencontainers.org/
[Docker rootless mode]: https://docs.docker.com/engine/security/rootless/
[docker 容器技术从入门到精通]: https://www.udemy.com/course/docker-china/learn/lecture/27213604#overview
[課堂筆記]: https://dockertips.readthedocs.io/en/latest/

<!------------ ref end ------------>

# Podman

> DATE: 5 (2023)
> REF: [Podman 官網] | [Docker 容器技术从入门到精通] | [課堂筆記]

## # 簡介

- 符合 [OCI] 標準容器的容器引擎
- Red Hat 推出的開源軟體
- Daemonless
- Rootless （新版 Docker 也有：[Docker rootless mode]）

![](../src/image/podman_vs_docker.png)

## # 安裝與設定

## # 問題集中區

## <mark># TODO: 待整理</mark>

- Rootless

  - 因為不在 root 執行，所以會有一些**權限**不同

    - EX. 不能使用 1024 以下的 port

  - image & container 都是在個別 user 中

    - <mark>TODO:Q</mark> 使用多個 user，則要好幾份 image 佔空間，該怎麼處理？會有什麼使用時機會需要在不同 user 中，使用同一個 image 嗎？

- 可直接建立 pod

  - 在同一個 pod 等於在同一個 `Network namespace`

## # 其他補充

<!-- 注意事項 -->

- 注意事項：

  - <details close>
    <summary></summary>

    </details>

<!-- 小技巧 -->

- 小技巧：

<!-- 小工具 -->

- 小工具：

<!-- 補充學習 -->

- 補充學習：

---

## # 踩雷實錄

<!-- search 無結果 -->

- <details close>
  <summary>search 無結果</summary>

  - 需在 `/etc/containers/registries.conf` 檔案中，設定 `unqualified-search-registries`
  - EX. `unqualified-search-registries = ['docker.io']`，則可以搜尋到 `docker.io` 上的 image，同理也須設定其他的 registry 才會有該結果
  - 常用的 registry 有：["docker.io", "quay.io", "gcr.io", "registry.redhat.io"]

  </details>

---

## # 延伸討論

<!-- 切換 user 問題 -->

- <details close>
  <summary>切換 user 問題</summary>

  - 直接以 `su demo` 切換到 demo user 時，執行 podman 會出錯：

    ```sh
    ERRO[0000] XDG_RUNTIME_DIR directory "/run/user/1000" is not owned by the current user
    ```

  - 此為 `cgroup` 的問題 (<mark>TODO: 詳細待查</mark>)

  - 改用 `su -l demo` 切換來解決，又遇到以下問題

    ![](../src/image/cgroup_err.png)

  - 以 `loginctl enable-linger $USER` 來開啟 linger 解決

    - 應該是因為沒有真正登入到 demo，而是在 ocup 切換到 demo 的關係
    - 因為當登入 ocup 時，無需開啟 ocup 的 linger，也不會有 error

    ![](../src/image/GPT_linger.png)

  </details>
