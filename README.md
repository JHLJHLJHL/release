# HONEYMATH 앱 배포 페이지

https://jhljhljhl.github.io/release/

빌드 없는 정적 사이트입니다. 앱 정보는 `apps-data.js` 한 파일에 있습니다.

- `index.html` — 홈
- `apps.html` — 앱 목록
- `app.html?id=<앱 id>` — 앱 상세
- `assets/<앱 id>/` — 아이콘, 스크린샷 3장

## 앱 파일 올리기

HTML 앱은 이 저장소의 Release 첨부 파일로 나눠 줍니다. 태그는 `<앱 id>-v<버전>`, 파일 이름은 `<앱 id>.html` 입니다.

```bash
gh release create ai-workbench-v1.3.0 ai-workbench.html -R JHLJHLJHL/release --title "생기부 AI 작업실 1.3.0"
```

새 버전을 올리면 `apps-data.js` 의 `version` · `updated` · `url` 도 함께 고칩니다.
