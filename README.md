# Tic Tac Toe
- 기본 기능은 [React turoial](https://react.dev/learn/tutorial-tic-tac-toe)을 따라 완료했습니다.
- 6가지 개선 사항을 추가적으로 구현 했습니다.
![ticTacToe](https://github.com/skyler-dev/reactPractices/assets/132126027/185fb491-9cd2-4d57-a4c4-1f1754306aa0)

## 구현한 개선 사항
1. Show text instead of button, for the current move only
  - 현재 수(move)에 대해서만 버튼 대신 "...#의 수 있습니다."를 표시했습니다.
  - 수는 체스 게임에서 "수를 두다."할 때의 수 입니다. 
2. Refactor hardcoding into roops
  - Board 컴포넌트를 다시 작성하여 하드코딩하는 대신 두 개의 루프(여기서는 map)를 사용하여 Square 컴포넌트를 줄에 맞게 배치했습니다.
3. Add a toggle button for sort
  - 오름차순 또는 내림차순으로 moves을 정렬할 수 있는 토글 버튼을 추가했습니다.
  - moves는 과거의 수(move)들로 점프할 수 있는 버튼 리스트 표시용입니다.
4. Add highlighting the winning squares
  - 누군가 승리하면 승리의 원인이 된 세 개의 사각형을 강조 표시하도록 했습니다.
  - 강조 표시는 노란색 배경화면으로 설정했습니다.
5. Display a draw message
  - 무승부의 경우, 무승부 메시지를 표시하도록 했습니다.
6. Display the location (row, col) for each move
  - 각각의 수에 대해 위치를 (행, 열)의 형태로 moves에 표시했습니다.

## 기본 기능
1. 틱택토 게임을 할 수 있다.
    - 사각형을 클릭하면 사각형의 값을 비어 있는 상태에서 "X"로 변경
    - “X”와 “O” 교대로 게임 진행
        - 상태 끌어 올리기
2. 승자를 선언하고 표시할 수 있다.
3. 게임이 진행됨에 따라 게임 기록을 저장한다.
4. 플레이어가 게임 기록을 검토하고 게임 보드의 이전 버전을 볼 수 있다.
    - 게임 기록을 검토(review)하고 과거 수(moves)으로 "jump back"할 수 있는 "시간 여행" 기능
    - 즉, *an ability to undo and redo certain actions*
        - 필요사항 :
        - [불변성] 데이터 변형(mutation)을 방지 → 이전 버전의 데이터를 그대로 킵 가능
        - [상태 다시 끌어 올리기]최상위 컴포넌트 작성, 기록용 상태(중첩 배열) 배치 → 이력 저장 가능
    - 형태 : 게임 보드 오른쪽에 번호가 매겨진 목록 형태
    - 과정 : 이 목록은 게임에서 발생한 모든 동작의 기록을 제공하며 게임이 진행됨에 따라 업데이트된다.

## 사용 방법
1. 모든 디펜던시 설치 : **npm install** 또는 **yarn install**
2. dev server 실행 : **npm run dev** 또는 **yarn start**