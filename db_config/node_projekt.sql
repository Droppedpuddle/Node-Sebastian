-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 10 maj 2023 kl 14:38
-- Serverversion: 10.4.24-MariaDB
-- PHP-version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `node_projekt`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `node_forum`
--

CREATE TABLE `node_forum` (
  `id` int(12) NOT NULL,
  `category` text NOT NULL,
  `question` text NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `node_forum`
--

INSERT INTO `node_forum` (`id`, `category`, `question`, `datum`) VALUES
(12, 'html', 'Hej hur gör ändrar man method i HTML-form?', '2023-04-25 00:00:00'),
(13, 'css', 'Vad är skillnaden mellan SCSS och CSS?', '2023-04-25 00:00:00'),
(14, 'node', 'Hur fungerar Node.js?', '2023-04-25 00:00:00');

-- --------------------------------------------------------

--
-- Tabellstruktur `node_info`
--

CREATE TABLE `node_info` (
  `id` int(12) NOT NULL,
  `rubrik` text NOT NULL,
  `text` text NOT NULL,
  `bild` text NOT NULL,
  `author` varchar(256) NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `node_info`
--

INSERT INTO `node_info` (`id`, `rubrik`, `text`, `bild`, `author`, `datum`) VALUES
(25, 'Hallå elle', '\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas elit neque, vitae eleifend nisl commodo sit amet. Pellentesque rutrum nunc et magna porttitor, et volutpat felis laoreet. Aenean a urna a elit faucibus semper pellentesque ac leo. Quisque dui erat, bibendum porta dapibus et, ullamcorper sed risus. Praesent tempus tincidunt turpis at mattis. Proin eget ante aliquet, suscipit leo mollis, euismod libero. Vestibulum elementum nibh augue, vel viverra ligula fermentum non. Ut quis nibh et sem elementum hendrerit quis vel justo.', '1682458629274.png', 'seboma0831', '2023-04-25 23:37:09'),
(26, 'Problem med programmering', 'Morbi sodales, erat eget tempor interdum, sapien nibh vestibulum tortor, ultricies venenatis velit ante vitae dolor. Aliquam erat elit, pretium vel tellus iaculis, congue finibus justo. Maecenas luctus tortor ut massa tincidunt cursus. Nam laoreet ornare porta. Cras vestibulum placerat augue non condimentum. Fusce volutpat est nisi, vel pellentesque nisi venenatis ac. Nulla facilisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris fermentum vestibulum ante, sed tempor elit dapibus at. Sed in lacinia velit, quis suscipit ligula. Ut fermentum mi vel lectus ornare, quis pulvinar tellus euismod.', '1682458661703.png', 'seboma0831', '2023-04-25 23:37:41'),
(27, 'Första inlägget', 'Sed sodales ligula sed purus accumsan tempor. Morbi sed fringilla nulla. Nullam finibus lorem lorem. Sed hendrerit leo metus, suscipit lobortis urna pellentesque sed. Pellentesque mollis nibh ut odio accumsan, eu vestibulum tellus blandit. Proin euismod ac lorem porta viverra. Donec eu libero ac sapien vestibulum dictum sit amet non velit.', '1682458739200.jpg', 'seboma0831', '2023-04-25 23:38:59'),
(28, 'Tvådje inlägget', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sollicitudin nisl at nulla suscipit, nec interdum enim porta. Integer semper volutpat mauris, non porta lectus porta commodo. Mauris a tellus venenatis, rhoncus nisl sed, dictum felis. Praesent ac diam nec elit dapibus posuere. Nunc porta justo at suscipit viverra. Proin eget nisi nibh. Aliquam erat volutpat. Aenean commodo tristique odio nec tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti.', '1682497225229.jpg', 'sebbeoman', '2023-04-26 10:20:25');

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` int(12) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `datum`) VALUES
(26, 'seboma0831', 'Goginator04', '0000-00-00 00:00:00'),
(27, 'droppedpuddle', 'Goginator04', '2023-04-25 00:00:00'),
(28, 'sebbeoman', 'banan123', '2023-04-26 10:19:34'),
(29, 'sebbish', 'hejhej123', '2023-05-10 01:08:39');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `node_forum`
--
ALTER TABLE `node_forum`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `node_info`
--
ALTER TABLE `node_info`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `node_forum`
--
ALTER TABLE `node_forum`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT för tabell `node_info`
--
ALTER TABLE `node_info`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
