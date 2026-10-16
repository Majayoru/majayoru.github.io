# jujumalon

JuJuMalon 포트폴리오 사이트 (HTML / CSS / JavaScript, 빌드 과정 없음)

## 구조

```text
index.html                        섹션 뼈대 (Home / Work / Lab / Journal / About / Contact)
css/style.css                     디자인 (다크/라이트 테마)
js/data.js                        내용 데이터  <- 내용 수정은 여기만
js/main.js                        화면 그리기, 테마, 타이핑 효과
posts.json                        티스토리 최신 글 (자동 생성)
scripts/fetch-posts.mjs           티스토리 RSS -> posts.json
.github/workflows/update-posts.yml  하루 4번 자동 실행
```

## 배포 순서

1. GitHub에서 `jujumalon` 이름으로 Public 저장소 생성
2. 이 폴더의 파일 전체를 업로드 (숨김 폴더 `.github` 포함)
3. Settings > Pages > Source: Deploy from a branch, Branch: `main` / `(root)`
4. Actions 탭 > Update Latest Notes > Run workflow 로 첫 실행
5. 1~2분 뒤 https://kangxoals-debug.github.io/jujumalon 접속
